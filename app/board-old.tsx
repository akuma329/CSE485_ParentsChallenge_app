import React, { useContext } from "react";
import { StyleSheet, Text, View } from "react-native";
import { LanguageContext } from "../LanguageContext";
import { translations } from "../translations";

export default function Board() {
  const { isSpanish } = useContext(LanguageContext);

  const boardText = isSpanish
    ? translations.es.boardPageText
    : translations.en.boardPageText;

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{boardText}</Text>
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
