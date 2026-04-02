//about us page
//Last edited: 3/16/2026
//Edited by: Sheneeza

import React, { useState } from "react";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

const aboutUs = () => {
  const [titleText, setTitleText] = useState("About Us");
  const [whoWeAreText, setWhoWeAreText] = useState("The Mission");
  const missionText =
    "Parents Challenge disrupts the legacy of educational failure by empowering parents. We provide our families with information, training, mentoring, tools, and financial resources to equip them to choose the education they think best for their children.";
  const [backButton, setBackButton] = useState(false);

  const makingADifference1 =
    "Founded in 2000 by Steve and Joyce Schuck, Parents Challenge equips families with the tools and resources needed to confidently exercise educational choice and achieve academic success. \n\n Over the past 25 years, Parents Challenge has served more than 4,500 students and their families, distributing over two million dollars in scholarships and grants to ensure that opportunity is never limited by income.\n\nThrough decades of measuring academic outcomes, we have seen that when parents and guardians are empowered and supported, lives change. Students succeed, families grow stronger, and entire communities benefit. \n\nParents Challenge is not just impacting education, it is transforming futures.";

  const ourFoudningPrinciplesBullets = [
    "All children have the right to be educated.",
    "Parents know what is best for their children.",
    "Schools must be accountable to the children and their parents.",
    "Empowering parents with “choice” means a better education for all.",
    "Parents must be engaged in the education of their children.",
    "Most importantly, we are committed to making these beliefs real and available to families in Colorado Springs and, ultimately, across the country.",
  ];

  const chronicAbsentText = "Our Statistics";
  const proficiencyRateText = "Proficiency Rate";

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
