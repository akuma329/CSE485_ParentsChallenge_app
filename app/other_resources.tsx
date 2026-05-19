import * as Linking from "expo-linking";
import React, { useContext } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { LanguageContext } from "../LanguageContext";
import { translations } from "../translations";

export default function Other_Resources() {
  const { isSpanish } = useContext(LanguageContext);

  const tutoringText = isSpanish
    ? translations.es.otherResourcesTutoring
    : translations.en.otherResourcesTutoring;

  const sportsText = isSpanish
    ? translations.es.otherResourcesSports
    : translations.en.otherResourcesSports;

  const mentalHealthText = isSpanish
    ? translations.es.otherResourcesMentalHealth
    : translations.en.otherResourcesMentalHealth;

  const moreResourcesText = isSpanish
    ? translations.es.otherResourcesMoreResources
    : translations.en.otherResourcesMoreResources;

  return (
    <View style={styles.container}>
      <Pressable
        style={styles.button}
        onPress={() =>
          Linking.openURL("https://parentschallenge.org/parents/tutoring/")
        }
      >
        <Text style={styles.buttonText}>{tutoringText}</Text>
      </Pressable>

      <Pressable
        style={styles.button}
        onPress={() =>
          Linking.openURL("https://parentschallenge.org/sports-resources/")
        }
      >
        <Text style={styles.buttonText}>{sportsText}</Text>
      </Pressable>

      <Pressable
        style={styles.button}
        onPress={() =>
          Linking.openURL(
            "https://parentschallenge.org/mental-health-resources/",
          )
        }
      >
        <Text style={styles.buttonText}>{mentalHealthText}</Text>
      </Pressable>

      <Pressable
        style={styles.button}
        onPress={() =>
          Linking.openURL("https://parentschallenge.org/parents/resources/")
        }
      >
        <Text style={styles.buttonText}>{moreResourcesText}</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    width: 260,
    backgroundColor: "#6699AB",
    paddingVertical: 16,
    borderRadius: 20,
    marginVertical: 10,
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "600",
    textAlign: "center",
  },
});
