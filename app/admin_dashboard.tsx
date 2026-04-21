import { router } from "expo-router";
import { signOut } from "firebase/auth";
import {
  collectionGroup,
  doc,
  getDocs,
  query,
  updateDoc
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import {
  Alert,
  FlatList,
  Linking,
  Modal,
  RefreshControl,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";
import { auth, db } from "../firebaseConfig";

export default function AdminForms() {
  const [groupedSubmissions, setGroupedSubmissions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [expandedUser, setExpandedUser] = useState<string | null>(null);

  const [denyModalVisible, setDenyModalVisible] = useState(false);
  const [denialReason, setDenialReason] = useState("");
  const [activeSub, setActiveSub] = useState<{path: string, email: string} | null>(null);

  const fetchAllSubmissions = async () => {
    try {
      setLoading(true);
      const submissionsQuery = query(collectionGroup(db, "formSubmissions"));
      const querySnapshot = await getDocs(submissionsQuery);
      
      const allData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        fullPath: doc.ref.path, 
        ...doc.data()
      })) as any[];

      const groups: Record<string, any> = {};

      allData.forEach((sub) => {
        const email = sub.parentEmail || "unknown@test.com";
        if (!groups[email]) {
          groups[email] = {
            email: email,
            lastName: sub.parentLastName || "Unknown",
            submissions: []
          };
        }
        groups[email].submissions.push(sub);
      });

      const sortedGroups = Object.values(groups).sort((a, b) => 
        a.lastName.localeCompare(b.lastName)
      );

      setGroupedSubmissions(sortedGroups);
    } catch (error) {
      console.error("Admin Fetch Error:", error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const handleApprove = async (docPath: string, userEmail: string) => {
    try {
      const docRef = doc(db, docPath);
      await updateDoc(docRef, { 
        status: "Approved", 
        adminFeedback: ""
      });
      fetchAllSubmissions();
      Alert.alert("Success", "Form Approved");
    } catch (error) {
      Alert.alert("Error", "Could not approve form.");
    }
  };

  const openDenyModal = (docPath: string, userEmail: string) => {
    setActiveSub({ path: docPath, email: userEmail });
    setDenialReason("");
    setDenyModalVisible(true);
  };

  const submitDenial = async () => {
    if (!activeSub) return;
    try {
      const docRef = doc(db, activeSub.path);
      await updateDoc(docRef, { 
        status: "Denied", 
        adminFeedback: denialReason || "No reason provided." 
      });
      setDenyModalVisible(false);
      fetchAllSubmissions();
      Alert.alert("Form Denied", "The parent will see your feedback on their dashboard.");
    } catch (error) {
      Alert.alert("Error", "Could not deny form.");
    }
  };

  useEffect(() => { fetchAllSubmissions(); }, []);

  const renderSubmission = (sub: any, userEmail: string) => (
    <View key={sub.id} style={styles.subItem}>
      <View style={styles.subRow}>
        <Text style={styles.subTitle}>{sub.formId.toUpperCase()}</Text>
        <Text style={[styles.subStatus, { color: sub.status === "Approved" ? "#2ECC71" : "#E69A2F" }]}>
          {sub.status}
        </Text>
      </View>
      
      {sub.adminFeedback ? (
        <Text style={styles.existingFeedback}>Note: {sub.adminFeedback}</Text>
      ) : null}

      <View style={styles.subActions}>
        <TouchableOpacity style={styles.smallBtn} onPress={() => Linking.openURL(`https://www.jotform.com/submission/${sub.jotformSubmissionId}`)}>
          <Text style={styles.btnText}>View Form</Text>
        </TouchableOpacity>
        
        {sub.status === "Waiting for Approval" && (
          <>
            <TouchableOpacity style={[styles.smallBtn, { backgroundColor: "#2ECC71" }]} onPress={() => handleApprove(sub.fullPath, userEmail)}>
              <Text style={styles.btnText}>Approve</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.smallBtn, { backgroundColor: "#E74C3C" }]} onPress={() => openDenyModal(sub.fullPath, userEmail)}>
              <Text style={styles.btnText}>Deny</Text>
            </TouchableOpacity>
          </>
        )}
      </View>
    </View>
  );

  const renderGroup = ({ item }: { item: any }) => {
    const isExpanded = expandedUser === item.email;
    const pendingCount = item.submissions.filter((s: any) => s.status === "Waiting for Approval").length;

    return (
      <View style={styles.userCard}>
        <TouchableOpacity 
          style={styles.userHeader} 
          onPress={() => setExpandedUser(isExpanded ? null : item.email)}
        >
          <View>
            <Text style={styles.userName}>{item.lastName.toUpperCase()}</Text>
            <Text style={styles.userEmail}>{item.email}</Text>
          </View>
          {pendingCount > 0 && (
            <View style={styles.alertBadge}>
              <Text style={styles.alertText}>{pendingCount} PENDING</Text>
            </View>
          )}
        </TouchableOpacity>

        {isExpanded && (
          <View style={styles.expandedContent}>
            {item.submissions.map((sub: any) => renderSubmission(sub, item.email))}
          </View>
        )}
      </View>
    );
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.replace("/");
    } catch (error) {
      Alert.alert("Error", "Could not log out.");
    }};

  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <Text style={styles.title}>Admin Dashboard</Text>
        <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout}>
          <Text style={styles.logoutBtnText}>Logout</Text>
        </TouchableOpacity>
      </View>
      
      <FlatList 
        data={groupedSubmissions}
        renderItem={renderGroup}
        keyExtractor={(item) => item.email}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={fetchAllSubmissions} />}
      />

      <Modal visible={denyModalVisible} animationType="slide" transparent={true}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Reason for Denial</Text>
            <Text style={styles.modalSubtitle}>The parent will see this message on their dashboard.</Text>
            <TextInput
              style={styles.textInput}
              multiline
              numberOfLines={4}
              value={denialReason}
              onChangeText={setDenialReason}
            />
            <View style={styles.modalButtons}>
              <TouchableOpacity style={styles.cancelBtn} onPress={() => setDenyModalVisible(false)}>
                <Text style={styles.cancelBtnText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.submitDenyBtn} onPress={submitDenial}>
                <Text style={styles.btnText}>Submit Denial</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 40,
    marginBottom: 20,
  },
  title: { 
    fontSize: 22, 
    fontWeight: "bold", 
    color: "#333" 
  },
  logoutBtn: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#E74C3C",
  },
  logoutBtnText: {
    color: "#E74C3C",
    fontWeight: "bold",
    fontSize: 14,
  },
  container: { flex: 1, backgroundColor: "#f4f7f6", padding: 15 },
  userCard: { backgroundColor: "#fff", borderRadius: 10, marginBottom: 10, elevation: 2 },
  userHeader: { padding: 15, flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  userName: { fontSize: 18, fontWeight: "bold", color: "#2c3e50" },
  userEmail: { fontSize: 13, color: "#7f8c8d" },
  alertBadge: { backgroundColor: "#E69A2F", paddingHorizontal: 8, paddingVertical: 4, borderRadius: 5 },
  alertText: { color: "#fff", fontSize: 10, fontWeight: "bold" },
  expandedContent: { backgroundColor: "#fafafa", padding: 10, borderTopWidth: 1, borderTopColor: "#eee" },
  subItem: { padding: 12, backgroundColor: "#fff", borderRadius: 8, marginBottom: 10, borderWidth: 1, borderColor: "#eee" },
  subRow: { flexDirection: "row", justifyContent: "space-between", marginBottom: 5 },
  subTitle: { fontWeight: "bold", color: "#34495e", fontSize: 15 },
  subStatus: { fontSize: 12, fontWeight: "800" },
  existingFeedback: { fontSize: 12, color: "#C0392B", fontStyle: "italic", marginBottom: 8 },
  subActions: { flexDirection: "row", gap: 8, marginTop: 5 },
  smallBtn: { backgroundColor: "#34495E", paddingVertical: 8, paddingHorizontal: 15, borderRadius: 6 },
  btnText: { color: "#fff", fontSize: 12, fontWeight: "bold" },
  
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center', padding: 20 },
  modalContent: { backgroundColor: '#fff', borderRadius: 15, padding: 20, elevation: 5 },
  modalTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 5 },
  modalSubtitle: { fontSize: 13, color: '#666', marginBottom: 15 },
  textInput: { borderWidth: 1, borderColor: '#ccc', borderRadius: 8, padding: 10, height: 100, textAlignVertical: 'top', marginBottom: 20 },
  modalButtons: { flexDirection: 'row', justifyContent: 'flex-end', gap: 10 },
  cancelBtn: { padding: 12 },
  cancelBtnText: { color: '#666', fontWeight: 'bold' },
  submitDenyBtn: { backgroundColor: '#E74C3C', paddingVertical: 12, paddingHorizontal: 20, borderRadius: 8 }
});