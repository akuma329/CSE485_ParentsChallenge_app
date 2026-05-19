import React, { useContext } from "react";
import { StyleSheet, Text, View } from "react-native";
import { LanguageContext } from "../LanguageContext";
import { translations } from "../translations";

export default function Programs() {
  const { isSpanish } = useContext(LanguageContext);

  const programsText = isSpanish
    ? translations.es.programsPageText
    : translations.en.programsPageText;

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{programsText}</Text>
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
