import { router } from "expo-router";
import React from "react";
import {
    SafeAreaView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

export default function UPLanding() {
  const parentName = "[Parent Name]";

  return (
    <SafeAreaView style={styles.container}>
      {/* Back button row */}
      <View style={styles.topRow}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Text style={styles.backText}>{"<"}</Text>
        </TouchableOpacity>
      </View>

      {/* Greeting banner */}
      <View style={styles.header}>
        <Text style={styles.headerText}>Hello, {parentName}!</Text>
      </View>

      {/* Buttons */}
      <View style={styles.buttonContainer}>
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
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f2f2f2",
  },

  topRow: {
    padding: 10,
  },

  backButton: {
    width: 40,
    height: 40,
    backgroundColor: "#c7e6f7",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    elevation: 4,
  },

  backText: {
    fontSize: 20,
    color: "#333",
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
  },

  cardButton: {
    width: "80%",
    backgroundColor: "#d9d9d9",
    paddingVertical: 25,
    borderRadius: 14,
    alignItems: "center",
    marginBottom: 35,
    elevation: 5,
  },

  cardText: {
    fontSize: 18,
    color: "#222",
  },
});