import DateTimePicker from "@react-native-community/datetimepicker";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  onSnapshot,
  orderBy,
  query,
  Timestamp,
  where
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Linking,
  Modal,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";
import { auth, db } from "../firebaseConfig";

export default function EmpowermentSessions() {
  const [canvaLink, setCanvaLink] = useState<string | null>(null);
  const [sessions, setSessions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Form State
  const [modalVisible, setModalVisible] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newTime, setNewTime] = useState("");
  const [newLocation, setNewLocation] = useState("");
  const [ampm, setAmpm] = useState("PM"); // Default to PM
  const [date, setDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);

  useEffect(() => {
    const user = auth.currentUser;
    if (!user) return;

    getDoc(doc(db, "settings", "canvaLink")).then((snap) => {
      if (snap.exists()) setCanvaLink(snap.data().schedule);
    });

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const q = query(
      collection(db, "users", user.uid, "userSessions"),
      where("sessionDate", ">=", Timestamp.fromDate(today)),
      orderBy("sessionDate", "asc")
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const fetched = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setSessions(fetched);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleDateChange = (event: any, selectedDate?: Date) => {
    if (Platform.OS === 'android') setShowPicker(false);
    if (selectedDate) setDate(selectedDate);
  };

  const handleAddSession = async () => {
    const user = auth.currentUser;
    if (!newTitle || !newLocation || !newTime) {
      Alert.alert("Missing Info", "Please fill out all fields.");
      return;
    }

    const fullTime = `${newTime} ${ampm}`;

    try {
      await addDoc(collection(db, "users", user!.uid, "userSessions"), {
        userId: user?.uid,
        title: newTitle,
        location: newLocation,
        sessionDate: Timestamp.fromDate(date),
        displayDate: date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
        time: fullTime,
        createdAt: Timestamp.now(),
      });

      setModalVisible(false);
      resetForm();
    } catch (error) {
      Alert.alert("Error", "Could not save session.");
    }
  };

  const resetForm = () => {
    setNewTitle("");
    setNewTime("");
    setNewLocation("");
    setDate(new Date());
    setAmpm("PM");
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Empowerment Sessions</Text>
        
        <Pressable style={styles.button} onPress={() => canvaLink && Linking.openURL(canvaLink)}>
          <Text style={styles.buttonText}>View Full Session Calendar</Text>
        </Pressable>

        <Pressable style={[styles.button, { backgroundColor: "#34415D" }]} onPress={() => Linking.openURL("https://app.donorview.com/EVT/Event/ListAll")}>
          <Text style={styles.buttonText}>Register in DonorView</Text>
        </Pressable>

        <View style={styles.headerRow}>
          <Text style={styles.sectionTitle}>Your Upcoming Sessions</Text>
          <TouchableOpacity style={styles.addBtn} onPress={() => setModalVisible(true)}>
            <Text style={styles.addBtnText}>+ Add Session</Text>
          </TouchableOpacity>
        </View>

        {loading ? (
          <ActivityIndicator color="#6699AB" style={{ marginTop: 20 }} />
        ) : sessions.length === 0 ? (
          <Text style={styles.emptyText}>No upcoming sessions added.</Text>
        ) : (
          sessions.map((session) => (
            <View key={session.id} style={styles.sessionBox}>
              <Text style={styles.sessionBoxTitle}>{session.title}</Text>
              <Text style={styles.sessionText}><Text style={styles.labelText}>Date:</Text> {session.displayDate}</Text>
              <Text style={styles.sessionText}><Text style={styles.labelText}>Time:</Text> {session.time}</Text>
              <Text style={styles.sessionText}><Text style={styles.labelText}>Location:</Text> {session.location}</Text>
            </View>
          ))
        )}
      </ScrollView>

      <Modal visible={modalVisible} animationType="slide" transparent={true}>
        <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <ScrollView showsVerticalScrollIndicator={false}>
              <Text style={styles.modalHeader}>New Session Entry</Text>

              <Text style={styles.inputLabel}>Session Name</Text>
              <TextInput style={styles.input} placeholder="e.g. Workshop Title" value={newTitle} onChangeText={setNewTitle} />

              <Text style={styles.inputLabel}>Location</Text>
              <TextInput style={styles.input} placeholder="e.g. Main Office" value={newLocation} onChangeText={setNewLocation} />

              <Text style={styles.inputLabel}>Time</Text>
              <View style={styles.timeRow}>
                <TextInput 
                  style={[styles.input, { flex: 1, marginBottom: 0 }]} 
                  placeholder="e.g. 6:00" 
                  value={newTime} 
                  keyboardType="numbers-and-punctuation"
                  onChangeText={setNewTime} 
                />
                <View style={styles.ampmContainer}>
                  {["AM", "PM"].map((opt) => (
                    <TouchableOpacity 
                      key={opt} 
                      style={[styles.ampmBtn, ampm === opt && styles.ampmBtnActive]} 
                      onPress={() => setAmpm(opt)}
                    >
                      <Text style={[styles.ampmText, ampm === opt && styles.ampmTextActive]}>{opt}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>

              <Text style={styles.inputLabel}>Date</Text>
              <View style={styles.datePickerContainer}>
                <DateTimePicker
                  value={date}
                  mode="date"
                  display={Platform.OS === 'ios' ? 'compact' : 'default'}
                  onChange={handleDateChange}
                  minimumDate={new Date()}
                  themeVariant="light"
                />
                <Text style={styles.dateValue}>{date.toLocaleDateString()}</Text>
              </View>

              <View style={styles.modalActions}>
                <TouchableOpacity style={styles.cancelBtn} onPress={() => setModalVisible(false)}>
                  <Text style={{ color: "#999" }}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.saveBtn} onPress={handleAddSession}>
                  <Text style={styles.saveBtnText}>Add to Schedule</Text>
                </TouchableOpacity>
              </View>
            </ScrollView>
          </View>
        </KeyboardAvoidingView>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flexGrow: 1, padding: 24, paddingTop: 50, alignItems: "center" },
  title: { fontSize: 26, fontWeight: "bold", marginBottom: 20 },
  button: { width: "100%", backgroundColor: "#6699AB", padding: 16, borderRadius: 15, marginVertical: 6 },
  buttonText: { color: "#fff", textAlign: "center", fontWeight: "bold" },
  headerRow: { flexDirection: "row", width: "100%", justifyContent: "space-between", alignItems: "center", marginTop: 25, marginBottom: 15 },
  sectionTitle: { fontSize: 18, fontWeight: "bold" },
  addBtn: { backgroundColor: "#E8F0F2", paddingHorizontal: 15, paddingVertical: 8, borderRadius: 10 },
  addBtnText: { color: "#6699AB", fontWeight: "bold" },
  sessionBox: { width: "100%", backgroundColor: "#F7F9FA", padding: 18, borderRadius: 15, marginBottom: 12, borderLeftWidth: 4, borderLeftColor: "#6699AB" },
  sessionBoxTitle: { fontSize: 17, fontWeight: "bold", color: "#34415D", marginBottom: 6 },
  sessionText: { fontSize: 14, color: "#555", marginTop: 3 },
  labelText: { fontWeight: "700", color: "#333" },
  emptyText: { color: "#999", marginTop: 20 },
  
  modalOverlay: { flex: 1, backgroundColor: "rgba(0,0,0,0.5)", justifyContent: "center", alignItems: "center" },
  modalContent: { width: "90%", backgroundColor: "#fff", borderRadius: 20, padding: 20 },
  modalHeader: { fontSize: 20, fontWeight: "bold", marginBottom: 20, textAlign: "center" },
  inputLabel: { fontSize: 12, fontWeight: "bold", color: "#999", marginBottom: 5, textTransform: "uppercase" },
  input: { backgroundColor: "#F5F7F8", padding: 14, borderRadius: 10, marginBottom: 15, borderWidth: 1, borderColor: "#EEE" },
  
  timeRow: { flexDirection: "row", alignItems: "center", gap: 10, marginBottom: 15 },
  ampmContainer: { flexDirection: "row", backgroundColor: "#F5F7F8", borderRadius: 10, padding: 4, borderWidth: 1, borderColor: "#EEE" },
  ampmBtn: { paddingHorizontal: 12, paddingVertical: 8, borderRadius: 8 },
  ampmBtnActive: { backgroundColor: "#6699AB" },
  ampmText: { fontSize: 12, fontWeight: "bold", color: "#666" },
  ampmTextActive: { color: "#fff" },

  datePickerContainer: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", backgroundColor: "#F5F7F8", padding: 10, borderRadius: 10, marginBottom: 20, borderWidth: 1, borderColor: "#EEE" },
  dateValue: { fontWeight: "bold", color: "#333", marginRight: 5 },

  modalActions: { flexDirection: "row", gap: 10 },
  cancelBtn: { flex: 1, padding: 15, alignItems: "center" },
  saveBtn: { flex: 2, backgroundColor: "#6699AB", padding: 15, borderRadius: 10, alignItems: "center" },
  saveBtnText: { color: "#fff", fontWeight: "bold" }
});