import {
  collection,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
  where
} from "firebase/firestore";
import React, { useCallback, useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Linking,
  RefreshControl,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import { auth, db } from "../firebaseConfig";

const JOTFORM_API_KEY = "455badb22001ae363d03b6f3dd46e444";

const getSchoolYear = () => {
  const now = new Date();
  const year = now.getFullYear();
  return now.getMonth() >= 6 ? `${year}-${year + 1}` : `${year - 1}-${year}`;
};

export default function Forms() {
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [config, setConfig] = useState<any>(null);
  const [formTemplates, setFormTemplates] = useState<any[]>([]); // Dynamic templates
  const [formStatuses, setFormStatuses] = useState<Record<string, any>>({});

  const activeYear = getSchoolYear();

  const fetchTemplates = async () => {
    try {
      const q = query(collection(db, "forms"), orderBy("order", "asc"));
      const snap = await getDocs(q);
      const templates = snap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setFormTemplates(templates);
      return templates;
    } catch (e) {
      console.error("Template Fetch Error:", e);
      return [];
    }
  };

  const fetchConfig = async () => {
    try {
      const docSnap = await getDoc(doc(db, "settings", "formConfig"));
      if (docSnap.exists()) setConfig(docSnap.data());
    } catch (e) { console.error("Config Fetch Error:", e); }
  };

  const fetchFirebaseStatus = async (templates: any[]) => {
    const user = auth.currentUser;
    if (!user) return {};
    try {
      const submissionsRef = collection(db, "users", user.uid, "formSubmissions");
      const q = query(submissionsRef, where("year", "==", activeYear));
      const querySnapshot = await getDocs(q);

      const updatedStatuses: Record<string, any> = {};
      templates.forEach(t => {
        updatedStatuses[t.id] = { status: "Not Submitted" };
      });

      querySnapshot.forEach((doc) => {
        const data = doc.data();
        if (updatedStatuses[data.formId]) updatedStatuses[data.formId] = data;
      });

      setFormStatuses(updatedStatuses);
      return updatedStatuses; 
    } catch (error) { return {}; }
  };

  const syncWithJotForm = async (showAlert = false, latestStatuses?: Record<string, any>, activeTemplates?: any[]) => {
    const user = auth.currentUser;
    if (!user || !user.email) return;
    
    const currentCheck = latestStatuses || formStatuses;
    const currentTemplates = activeTemplates || formTemplates;

    try {
      let foundNewSubmission = false;

      for (const form of currentTemplates) {
        if (currentCheck[form.id]?.status === "Approved") continue;

        const response = await fetch(`https://api.jotform.com/form/${form.jotformId}/submissions?apiKey=${JOTFORM_API_KEY}`);
        const result = await response.json();
        const contentArray = Array.isArray(result.content) ? result.content : [];

        const matchingSubmission = contentArray.find((submission: any) => {
          const answers = Object.values(submission.answers || {});
          return answers.some((ans: any) => {
            const val = (ans.answer || ans.value || ans.prettyValue || "").toString().toLowerCase().trim();
            return val === user.email?.toLowerCase().trim();
          });
        });

        if (matchingSubmission) {
          const existingSubId = currentCheck[form.id]?.jotformSubmissionId;

          if (!existingSubId || existingSubId !== matchingSubmission.id) {
            foundNewSubmission = true;
            const subDocId = `${form.id}_${activeYear}`;
            const userDoc = await getDoc(doc(db, "users", user.uid));
            const userData = userDoc.data();
            
            await setDoc(doc(db, "users", user.uid, "formSubmissions", subDocId), {
              formId: form.id,
              year: activeYear,
              status: "Waiting for Approval",
              jotformSubmissionId: matchingSubmission.id,
              parentEmail: user.email,
              parentLastName: userData?.lastName || "ZZZ",
              adminFeedback: "",
              verifiedAt: serverTimestamp()
            });
          }
        }
      }

      if (foundNewSubmission) await fetchFirebaseStatus(currentTemplates);
      if (showAlert) Alert.alert("Sync Complete", "Statuses updated.");
    } catch (e) { console.error(e); }
  };

  useEffect(() => {
    const init = async () => {
      setLoading(true);
      await fetchConfig();
      const templates = await fetchTemplates(); 
      const freshStatuses = await fetchFirebaseStatus(templates);
      await syncWithJotForm(false, freshStatuses, templates);
      setLoading(false);
    };
    init();
  }, []);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await fetchConfig();
    const templates = await fetchTemplates();
    const freshStatuses = await fetchFirebaseStatus(templates);
    await syncWithJotForm(true, freshStatuses, templates);
    setRefreshing(false);
  }, [formTemplates, formStatuses]);

  // Existing helpers (isWindowOpen, getNextOpeningDate, getStatusColor) remain the same...
  const isWindowOpen = () => {
    if (!config || !config.fallStart || !config.springStart) return false;
    const now = new Date();
    const today = `${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
    const formatMD = (str: string) => {
      const parts = str.split(/[-/]/);
      return `${parts[0].padStart(2, '0')}-${parts[1].padStart(2, '0')}`;
    };
    const fallS = formatMD(config.fallStart);
    const fallE = formatMD(config.fallEnd);
    const sprS = formatMD(config.springStart);
    const sprE = formatMD(config.springEnd);
    return (today >= fallS || today <= fallE) || (today >= sprS && today <= sprE);
  };

  const getNextOpeningDate = () => {
    if (!config?.fallStart || !config?.springStart) return "soon";
    const now = new Date();
    const currentYear = now.getFullYear();
    const fallStr = `${currentYear}/${config.fallStart.replace('-', '/')}`;
    const springStr = `${currentYear}/${config.springStart.replace('-', '/')}`;
    const fallDate = new Date(fallStr);
    const springDate = new Date(springStr);
    if (now > fallDate) fallDate.setFullYear(currentYear + 1);
    if (now > springDate) springDate.setFullYear(currentYear + 1);
    return (fallDate < springDate ? fallDate : springDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  const getStatusColor = (status: string, formId : string) => {
    if (formId === "choice" && status === "Not Submitted") return "#7F8C8D";
    if (status === "Waiting for Approval") return "#E69A2F"; 
    if (status === "Not Submitted") return "#E84C3D"; 
    if (status === "Approved") return "#2ECC71"; 
    if (status === "Denied") return "#C0392B"; 
    return "#333";
  };

  if (loading) return <View style={styles.centered}><ActivityIndicator size="large" color="#6f9bb2" /></View>;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}><Text style={styles.headerText}>Parent Dashboard</Text></View>
      <ScrollView style={styles.content} refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
        
        {formTemplates.map((form) => {
          const formData = formStatuses[form.id];
          const status = formData?.status || "Not Submitted";
          
          let displayStatus = status;
          if (form.id === "choice" && status === "Not Submitted") {
            displayStatus = "No choice update forms submitted recently";
          } else if (status === "Approved" && formData?.verifiedAt) {
            const date = formData.verifiedAt.toDate();
            displayStatus = `Approved on ${date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}`;
          }

          const isOpen = form.isSeasonal ? isWindowOpen() : true;
          const showLink = (status === "Not Submitted" || status === "Denied") && isOpen;

          return (
            <View key={form.id} style={styles.formBlock}>
              <Text style={styles.formTitle}>{form.name}</Text>
              <Text style={styles.statusText}>Status: <Text style={{ color: getStatusColor(status, form.id), fontWeight: "600" }}>{displayStatus}</Text></Text>

              {status === "Denied" && formData.adminFeedback && (
                <View style={styles.feedbackBox}>
                  <Text style={styles.feedbackTitle}>Admin Note:</Text>
                  <Text style={styles.feedbackText}>"{formData.adminFeedback}"</Text>
                </View>
              )}

              {showLink ? (
                <TouchableOpacity onPress={() => Linking.openURL(`https://form.jotform.com/${form.jotformId}`)}>
                  <Text style={styles.viewForm}>{status === "Denied" ? "Submit New Version" : "Fill Out Form"}</Text>
                </TouchableOpacity>
              ) : (
                <Text style={styles.confirmedText}>
                  {form.isSeasonal && !isOpen && status === "Not Submitted" 
                    ? `Window Closed. Next window opens ${getNextOpeningDate()}.`
                    : status === "Approved" ? "Submission processed." : "Awaiting verification."}
                </Text>
              )}
            </View>
          );
        })}

        <TouchableOpacity style={{ marginTop: 20, marginBottom: 40 }} onPress={() => syncWithJotForm(true)}>
          <Text style={[styles.viewForm, { textAlign: "center", color: "#6f9bb2", textDecorationLine: "none" }]}>🔄 Refresh Status</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f2f2f2" },
  centered: { flex: 1, justifyContent: "center", alignItems: "center" },
  header: { backgroundColor: "#6f9bb2", paddingVertical: 22, alignItems: "center" },
  headerText: { color: "#fff", fontSize: 20, fontWeight: "500" },
  content: { padding: 20 },
  formBlock: { marginBottom: 35 },
  formTitle: { fontSize: 18, fontWeight: "600", marginBottom: 6, color: "#333" },
  statusText: { fontSize: 16, marginBottom: 4, color: "#555" },
  viewForm: { fontSize: 16, color: "#2D9CDB", textDecorationLine: "underline", marginTop: 2 },
  confirmedText: { fontSize: 14, color: "#888", fontStyle: "italic", marginTop: 4 },
  feedbackBox: { backgroundColor: "#FDEDEC", padding: 10, borderRadius: 6, marginTop: 8, marginBottom: 8, borderLeftWidth: 4, borderLeftColor: "#E74C3C" },
  feedbackTitle: { fontSize: 12, fontWeight: "bold", color: "#C0392B" },
  feedbackText: { fontSize: 14, color: "#333", fontStyle: "italic" },
});