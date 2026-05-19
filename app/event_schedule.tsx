import React, { useContext } from "react";
import { StyleSheet, Text, View } from "react-native";
import { LanguageContext } from "../LanguageContext";
import { translations } from "../translations";

export default function event_schedule() {
  const { isSpanish } = useContext(LanguageContext);

  const titleText = isSpanish
    ? translations.es.eventScheduleTitle
    : translations.en.eventScheduleTitle;

  const subtitleText = isSpanish
    ? translations.es.eventScheduleSubtitle
    : translations.en.eventScheduleSubtitle;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{titleText}</Text>
      <Text style={styles.subtitle}>{subtitleText}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 16,
    color: "#555",
  },
});
