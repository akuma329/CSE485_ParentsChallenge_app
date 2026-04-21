import { router } from "expo-router";
import {
    collection,
    doc,
    getDoc,
    getDocs,
    query,
    where
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import {
    ActivityIndicator,
    Alert,
    FlatList,
    Linking,
    RefreshControl,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from "react-native";
import { auth, db } from "../firebaseConfig";

export default function CoordinatorDashboard() {
  const [groupedSubmissions, setGroupedSubmissions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [expandedUser, setExpandedUser] = useState<string | null>(null);

  const fetchCoordinatorSubmissions = async () => {
  try {
    setLoading(true);
    const user = auth.currentUser;
    if (!user || !user.email) return;

    const coordDocRef = doc(db, "approvedEmails", user.email);
    const coordDocSnap = await getDoc(coordDocRef);
    const assignedEmails = coordDocSnap.data()?.approvedParents || [];

    if (assignedEmails.length === 0) {
      setGroupedSubmissions([]);
      return;
    }

    const usersRef = collection(db, "users");
    const q = query(usersRef, where("email", "in", assignedEmails));
    const userSnap = await getDocs(q);

    const allSubmissions: any[] = [];

    const fetchPromises = userSnap.docs.map(async (userDoc) => {
      const subRef = collection(db, `users/${userDoc.id}/formSubmissions`);
      const subSnap = await getDocs(subRef);
      
      subSnap.forEach((d) => {
        allSubmissions.push({
          id: d.id,
          ...d.data(),
          parentEmail: userDoc.data().email,
          parentLastName: userDoc.data().lastName || "Unknown"
        });
      });
    });

    await Promise.all(fetchPromises);

    const groups: Record<string, any> = {};
    allSubmissions.forEach((sub) => {
      const email = sub.parentEmail;
      if (!groups[email]) {
        groups[email] = {
          email: email,
          lastName: sub.parentLastName,
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
    console.error("Manual Fetch Error:", error);
    Alert.alert("Error", "Could not fetch submissions.");
  } finally {
    setLoading(false);
    setRefreshing(false);
  }
};

  useEffect(() => { fetchCoordinatorSubmissions(); }, []);

const renderSubmission = (sub: any) => {
    const isIncomeForm = sub.formId?.toLowerCase().includes("income");

    return (
      <View key={sub.id} style={styles.subItem}>
        <View style={styles.subRow}>
          <Text style={styles.subTitle}>{sub.formId.toUpperCase()}</Text>
          <Text style={[styles.subStatus, { color: sub.status === "Approved" ? "#2ECC71" : "#E69A2F" }]}>
            {sub.status}
          </Text>
        </View>
        
        {sub.adminFeedback ? (
          <Text style={styles.existingFeedback}>Admin Note: {sub.adminFeedback}</Text>
        ) : null}

        <View style={styles.subActions}>
          {isIncomeForm ? (
            <View style={styles.privacyBadge}>
              <Text style={styles.privacyText}>View Restricted (Admin Only)</Text>
            </View>
          ) : (
            <TouchableOpacity 
              style={styles.smallBtn} 
              onPress={() => Linking.openURL(`https://www.jotform.com/submission/${sub.jotformSubmissionId}`)}
            >
              <Text style={styles.btnText}>View Submission</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    );
  };

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
            {item.submissions.map((sub: any) => renderSubmission(sub))}
          </View>
        )}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <View>
          <Text style={styles.title}>My Group</Text>
          <Text style={styles.subtitle}>Tracking parent submissions</Text>
        </View>
        <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
          <Text style={styles.backBtnText}>Back</Text>
        </TouchableOpacity>
      </View>
      
      {loading ? (
        <ActivityIndicator size="large" color="#6f9bb2" style={{ marginTop: 50 }} />
      ) : (
        <FlatList 
          data={groupedSubmissions}
          renderItem={renderGroup}
          keyExtractor={(item) => item.email}
          ListEmptyComponent={
            <Text style={styles.emptyText}>No submissions found for your assigned parents.</Text>
          }
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={fetchCoordinatorSubmissions} />
          }
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f4f7f6", padding: 15 },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 40,
    marginBottom: 20,
  },
  title: { fontSize: 24, fontWeight: "bold", color: "#333" },
  subtitle: { fontSize: 14, color: "#666" },
  backBtn: {
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 8,
    backgroundColor: "#6f9bb2",
  },
  backBtnText: { color: "#fff", fontWeight: "bold" },
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
  privacyBadge: {
    backgroundColor: "#F2F2F2",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: "#DDD",
  },
  privacyText: {
    color: "#7F8C8D",
    fontSize: 11,
    fontWeight: "600",
    fontStyle: "italic",
  },
  emptyText: { textAlign: 'center', marginTop: 50, color: '#999', fontSize: 16 }
});