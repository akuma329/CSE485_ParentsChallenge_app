import React, { useContext } from "react";
import { StyleSheet, Text, View } from "react-native";
import { LanguageContext } from "../LanguageContext";
import { translations } from "../translations";

export default function Tutoring() {
  const { isSpanish } = useContext(LanguageContext);

  const tutoringText = isSpanish
    ? translations.es.tutoringPageText
    : translations.en.tutoringPageText;

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{tutoringText}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
  },
});
