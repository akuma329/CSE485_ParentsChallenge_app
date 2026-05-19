import React, { useContext } from "react";
import { StyleSheet, Text, View } from "react-native";
import { LanguageContext } from "../LanguageContext";
import { translations } from "../translations";

export default function Videos() {
  const { isSpanish } = useContext(LanguageContext);

  const videosText = isSpanish
    ? translations.es.videosPageText
    : translations.en.videosPageText;

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{videosText}</Text>
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
