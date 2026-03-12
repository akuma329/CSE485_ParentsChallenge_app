import React from "react";
import {
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

export default function Forms() {
  const forms = [
    { name: "Form 1", status: "Waiting for Approval" },
    { name: "Form 2", status: "Not Submitted" },
    { name: "Form 3", status: "Approved" },
  ];

  const getStatusColor = (status: string) => {
    if (status === "Waiting for Approval") return "#E69A2F"; // orange
    if (status === "Not Submitted") return "#E84C3D"; // red
    if (status === "Approved") return "#2ECC71"; // green
    return "#333";
  };

  return (
    <SafeAreaView style={styles.container}>
      
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerText}>Pending Forms</Text>
      </View>

      {/* Form List */}
      <ScrollView style={styles.content}>
        {forms.map((form, index) => (
          <View key={index} style={styles.formBlock}>
            <Text style={styles.formTitle}>{form.name}</Text>

            <Text style={styles.statusText}>
              Status:{" "}
              <Text style={{ color: getStatusColor(form.status) }}>
                {form.status}
              </Text>
            </Text>

            <TouchableOpacity>
              <Text style={styles.viewForm}>View Form</Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f2f2f2",
  },

  header: {
    backgroundColor: "#6f9bb2",
    paddingVertical: 22,
    alignItems: "center",
  },

  headerText: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "500",
  },

  content: {
    padding: 20,
  },

  formBlock: {
    marginBottom: 35,
  },

  formTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 6,
  },

  statusText: {
    fontSize: 16,
    marginBottom: 4,
  },

  viewForm: {
    fontSize: 16,
    color: "#2D9CDB",
    textDecorationLine: "underline",
  },
});