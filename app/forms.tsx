import React, { useContext } from "react";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { LanguageContext } from "../LanguageContext";
import { translations } from "../translations";

export default function Forms() {
  const { isSpanish } = useContext(LanguageContext);

  const headerText = isSpanish
    ? translations.es.formsHeaderText
    : translations.en.formsHeaderText;

  const statusText = isSpanish
    ? translations.es.formsStatusText
    : translations.en.formsStatusText;

  const viewFormText = isSpanish
    ? translations.es.formsViewFormText
    : translations.en.formsViewFormText;

  const waitingApprovalText = isSpanish
    ? translations.es.formsWaitingApprovalText
    : translations.en.formsWaitingApprovalText;

  const notSubmittedText = isSpanish
    ? translations.es.formsNotSubmittedText
    : translations.en.formsNotSubmittedText;

  const approvedText = isSpanish
    ? translations.es.formsApprovedText
    : translations.en.formsApprovedText;

  const forms = [
    { name: "Form 1", status: waitingApprovalText },
    { name: "Form 2", status: notSubmittedText },
    { name: "Form 3", status: approvedText },
  ];

  const getStatusColor = (status: string) => {
    if (status === "Waiting for Approval" || status === "Esperando Aprobación")
      return "#E69A2F";

    if (status === "Not Submitted" || status === "No Enviado") return "#E84C3D";

    if (status === "Approved" || status === "Aprobado") return "#2ECC71";

    return "#333";
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerText}>{headerText}</Text>
      </View>

      {/* Form List */}
      <ScrollView style={styles.content}>
        {forms.map((form, index) => (
          <View key={index} style={styles.formBlock}>
            <Text style={styles.formTitle}>{form.name}</Text>

            <Text style={styles.statusText}>
              {statusText}:{" "}
              <Text style={{ color: getStatusColor(form.status) }}>
                {form.status}
              </Text>
            </Text>

            <TouchableOpacity>
              <Text style={styles.viewForm}>{viewFormText}</Text>
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
