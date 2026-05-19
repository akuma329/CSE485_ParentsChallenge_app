//about us page
//Last edited: 4/21/2026
//Edited by: Sheneeza

import React, { useContext, useState } from "react";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { LanguageContext } from "../LanguageContext";
import { translations } from "../translations";

const aboutUs = () => {
  const { isSpanish } = useContext(LanguageContext);

  const titleText = isSpanish
    ? translations.es.aboutTitleText
    : translations.en.aboutTitleText;

  const whoWeAreText = isSpanish
    ? translations.es.aboutWhoWeAreText
    : translations.en.aboutWhoWeAreText;

  const missionText = isSpanish
    ? translations.es.aboutMissionText
    : translations.en.aboutMissionText;

  const makingADifference1 = isSpanish
    ? translations.es.aboutMakingADifference1
    : translations.en.aboutMakingADifference1;

  const chronicAbsentText = isSpanish
    ? translations.es.aboutChronicAbsentText
    : translations.en.aboutChronicAbsentText;

  const proficiencyRateText = isSpanish
    ? translations.es.aboutProficiencyRateText
    : translations.en.aboutProficiencyRateText;

  const [backButton, setBackButton] = useState(false);

  const ourFoundingPrinciplesBullets = [
    "All children have the right to be educated.",
    "Parents know what is best for their children.",
    "Schools must be accountable to the children and their parents.",
    "Empowering parents with “choice” means a better education for all.",
    "Parents must be engaged in the education of their children.",
    "Most importantly, we are committed to making these beliefs real and available to families in Colorado Springs and, ultimately, across the country.",
  ];

  //images
  const Absenteeism = () => {
    return (
      <Image
        style={styles.image}
        source={require("../assets/images/pc_chronic_absenteeism.png")}
      />
    );
  };

  const Proficiency = () => {
    return (
      <Image
        style={styles.image}
        source={require("../assets/images/pc_proficiency_rate.png")}
      />
    );
  };

  const Familiesserved = () => {
    return (
      <Image
        style={styles.image}
        source={require("../assets/images/familiesserved.png")}
      />
    );
  };

  const Mathreadingstats = () => {
    return (
      <Image
        style={styles.image}
        source={require("../assets/images/mathreadingstats.png")}
      />
    );
  };
  const chronicAbsentText = "Our Statistics";
  const proficiencyRateText = "Proficiency Rate";

  //display
  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <View style={styles.titleContainer}>
            <Text style={styles.titleText}>{titleText}</Text>
          </View>

          <View style={styles.bodyContainer}>
            <Text style={styles.makingADifference1}>{makingADifference1}</Text>
          </View>

          <View style={styles.titleContainer}>
            <Text style={styles.whoWeAre}>{whoWeAreText}</Text>
          </View>

          <View style={styles.bodyContainer}>
            <Text style={styles.makingADifference1}>{missionText}</Text>
          </View>
        </ScrollView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
    paddingHorizontal: 20,
    backgroundColor: "#ffffff",
  },

  scrollContainer: {
    paddingBottom: 40,
  },

  titleContainer: {
    width: "100%",
    alignItems: "center",
    marginBottom: 20,
  },

  titleText: {
    fontSize: 32,
    fontWeight: "bold",
  },

  bodyContainer: {
    backgroundColor: "#6596ab",
    borderRadius: 5,
    alignSelf: "stretch",
    padding: 20,
    marginBottom: 12,
  },

  missionText: {
    fontSize: 16,
    textAlign: "left",
    color: "#000000ff",
  },

  makingADifference1: {
    fontSize: 16,
    color: "#ffffff",
    textAlign: "left",
  },

  standardsOfExcellenceTitle: {
    fontSize: 25,
    fontWeight: "bold",
  },

  standardsOfExcellence: {
    fontSize: 16,
    color: "#000000ff",
    marginTop: 8,
    marginBottom: 12,
  },

  whoWeAre: {
    fontSize: 25,
    fontWeight: "bold",
  },

  imageContainer: {
    alignItems: "center",
    marginBottom: 20,
  },

  image: {
    width: "100%",
    height: undefined,
    aspectRatio: 1.8,
    resizeMode: "contain",
  },
});

export default aboutUs;
