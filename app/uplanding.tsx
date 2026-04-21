import { router } from "expo-router";
import { signOut } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { auth, db } from "../firebaseConfig";

export default function UPLanding() {
  const [parentName, setParentName] = useState("Parent");
  const [userRole, setUserRole] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      const user = auth.currentUser;
      if (user) {
        try {
          const userDoc = await getDoc(doc(db, "users", user.uid));
          if (userDoc.exists()) {
            const data = userDoc.data();
            setParentName(data.firstName || "Parent");
            setUserRole(data.role || "parent");
          }
        } catch (error) {
          console.error("Error fetching user name:", error);
        } finally {
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.replace("/");
    } catch (error) {
      console.error("Logout error:", error);
      Alert.alert("Error", "Could not log out. Please try again.");
    }
  };

  if (loading) {
    return (
      <View style={[styles.container, { justifyContent: 'center' }]}>
        <ActivityIndicator size="large" color="#6f9bb2" />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View style={styles.topSpacer} />

        <View style={styles.header}>
          <Text style={styles.headerText}>Hello, {parentName}!</Text>
        </View>


        <View style={styles.buttonContainer}>

          {userRole === "coordinator" && (
            <TouchableOpacity
              style={[styles.cardButton, styles.coordinatorButton]}
              onPress={() => router.push("/coordinator_dashboard" as any)}
            >
              <Text style={[styles.cardText, styles.coordinatorText]}>
                Coordinator Portal
              </Text>
            </TouchableOpacity>
          )}

          <TouchableOpacity
            style={styles.cardButton}
            onPress={() => router.push("/forms")}
          >
            <Text style={styles.cardText}>View Forms</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.cardButton}
            onPress={() => router.push("/event_schedule")}
          >
            <Text style={styles.cardText}>My Event Schedule</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.cardButton}
            onPress={() => router.push("/account_settings")}
          >
            <Text style={styles.cardText}>Account Settings</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.cardButton, styles.logoutButton]}
            onPress={handleLogout}
          >
            <Text style={[styles.cardText, styles.logoutText]}>Log Out</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f2f2f2",
  },
  topSpacer: {
    height: 40,
  },
  header: {
    backgroundColor: "#6f9bb2",
    paddingVertical: 28,
    alignItems: "center",
    marginBottom: 60,
  },
  headerText: {
    color: "white",
    fontSize: 22,
    fontWeight: "500",
  },
  buttonContainer: {
    alignItems: "center",
    paddingBottom: 40, 
  },
  cardButton: {
    width: "80%",
    backgroundColor: "#d9d9d9",
    paddingVertical: 25,
    borderRadius: 14,
    alignItems: "center",
    marginBottom: 35,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  coordinatorButton: {
    backgroundColor: "#3F6F80", 
    borderWidth: 1,
    borderColor: "#6696AB",
  },
  coordinatorText: {
    color: "#fff",
    fontWeight: "700",
  },
  cardText: {
    fontSize: 18,
    color: "#222",
    fontWeight: "500",
  },
  logoutButton: {
    backgroundColor: "#E84C3D", 
    marginTop: 10,
  },
  logoutText: {
    color: "#fff",
  },
});