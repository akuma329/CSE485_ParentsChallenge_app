import * as Linking from "expo-linking";
import { router } from "expo-router";
import React, { useContext } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { LanguageContext } from "../LanguageContext";
import { translations } from "../translations";

export default function Parent_Info() {
  const { isSpanish } = useContext(LanguageContext);

  const schoolTitle = isSpanish
    ? translations.es.parentInfoSchoolTitle
    : translations.en.parentInfoSchoolTitle;

  const assessmentText = isSpanish
    ? translations.es.parentInfoAssessmentText
    : translations.en.parentInfoAssessmentText;

  const considerationsText = isSpanish
    ? translations.es.parentInfoConsiderationsText
    : translations.en.parentInfoConsiderationsText;

  const assessmentListText = isSpanish
    ? translations.es.parentInfoAssessmentListText
    : translations.en.parentInfoAssessmentListText;

  const goalsText = isSpanish
    ? translations.es.parentInfoGoalsText
    : translations.en.parentInfoGoalsText;

  const nearbySchoolText = isSpanish
    ? translations.es.parentInfoNearbySchoolText
    : translations.en.parentInfoNearbySchoolText;

  const greatSchoolsLinkText = isSpanish
    ? translations.es.parentInfoGreatSchoolsLinkText
    : translations.en.parentInfoGreatSchoolsLinkText;

  const schoolAssessmentsText = isSpanish
    ? translations.es.parentInfoSchoolAssessmentsText
    : translations.en.parentInfoSchoolAssessmentsText;

  const assessChildText = isSpanish
    ? translations.es.parentInfoAssessChildText
    : translations.en.parentInfoAssessChildText;

  const publicCharterText = isSpanish
    ? translations.es.parentInfoPublicCharterText
    : translations.en.parentInfoPublicCharterText;

  const homeschoolText = isSpanish
    ? translations.es.parentInfoHomeschoolText
    : translations.en.parentInfoHomeschoolText;

  const privateSchoolText = isSpanish
    ? translations.es.parentInfoPrivateSchoolText
    : translations.en.parentInfoPrivateSchoolText;

  const parentTitleText = isSpanish
    ? translations.es.parentInfoParentTitleText
    : translations.en.parentInfoParentTitleText;

  const informationText = isSpanish
    ? translations.es.parentInfoInformationText
    : translations.en.parentInfoInformationText;

  const schoolChoiceText = isSpanish
    ? translations.es.parentInfoSchoolChoiceText
    : translations.en.parentInfoSchoolChoiceText;

  const nationalPTAText = isSpanish
    ? translations.es.parentInfoNationalPTAText
    : translations.en.parentInfoNationalPTAText;

  const commonCoreText = isSpanish
    ? translations.es.parentInfoCommonCoreText
    : translations.en.parentInfoCommonCoreText;

  const homeworkTipsText = isSpanish
    ? translations.es.parentInfoHomeworkTipsText
    : translations.en.parentInfoHomeworkTipsText;

  const greatSchoolsText = isSpanish
    ? translations.es.parentInfoGreatSchoolsText
    : translations.en.parentInfoGreatSchoolsText;

  const returnHomeText = isSpanish
    ? translations.es.parentInfoReturnHomeText
    : translations.en.parentInfoReturnHomeText;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.top}>
        <Text style={styles.textRow}>
          <Text style={styles.title}>{schoolTitle}</Text>
          <Text style={styles.cursiveText}>
            {" "}
            {assessmentText} {"\n"}
          </Text>
          <Text style={styles.title}>{considerationsText}</Text>
        </Text>

        <View style={styles.textBox}>
          <Text style={styles.basicText}>{assessmentListText}</Text>

          <Text style={styles.titleBlue}>
            {"\n"}
            {goalsText}
          </Text>
        </View>

        <View style={styles.textBox}>
          <Text style={styles.smallText}>
            {nearbySchoolText}{" "}
            <Text
              style={styles.linkText}
              onPress={() => Linking.openURL("https://www.greatschools.org/")}
            >
              {greatSchoolsLinkText}
            </Text>
          </Text>
        </View>
      </View>

      <View style={styles.middle}>
        <View style={styles.titleTextBox}>
          <Text style={styles.title}>{schoolAssessmentsText}</Text>
        </View>

        <Text style={styles.basicText}>
          {"\n"}
          {assessChildText}
        </Text>

        <Pressable
          style={styles.button}
          onPress={() => Linking.openURL("https://schoolchoiceforkids.org/")}
        >
          <Text style={styles.buttonText}>{publicCharterText}</Text>
        </Pressable>

        <Pressable
          style={styles.button}
          onPress={() => Linking.openURL("http://www.homeschoolfacts.com/")}
        >
          <Text style={styles.buttonText}>{homeschoolText}</Text>
        </Pressable>

        <Pressable
          style={styles.button}
          onPress={() =>
            Linking.openURL("https://www.privateschoolreview.com/")
          }
        >
          <Text style={styles.buttonText}>{privateSchoolText}</Text>
        </Pressable>
      </View>

      <View style={styles.bottom}>
        <View style={styles.titleTextBox}>
          <Text style={styles.textRowWhite}>
            <Text style={styles.title}>{parentTitleText}</Text>
            <Text style={styles.cursiveText}> {informationText}</Text>
          </Text>
        </View>

        <Pressable
          style={styles.bottomButton}
          onPress={() => Linking.openURL("https://schoolchoiceforkids.org/")}
        >
          <Text style={styles.bottomButtonText}>{schoolChoiceText}</Text>
        </Pressable>

        <Pressable
          style={styles.bottomButton}
          onPress={() => Linking.openURL("https://www.pta.org/")}
        >
          <Text style={styles.bottomButtonText}>{nationalPTAText}</Text>
        </Pressable>

        <Pressable
          style={styles.bottomButton}
          onPress={() => Linking.openURL("http://www.corestandards.org/")}
        >
          <Text style={styles.bottomButtonText}>{commonCoreText}</Text>
        </Pressable>

        <Pressable
          style={styles.bottomButton}
          onPress={() =>
            Linking.openURL(
              "https://www2.ed.gov/parents/academic/involve/homework/index.html",
            )
          }
        >
          <Text style={styles.bottomButtonText}>{homeworkTipsText}</Text>
        </Pressable>

        <Pressable
          style={styles.bottomButton}
          onPress={() => Linking.openURL("https://www.greatschools.org/")}
        >
          <Text style={styles.bottomButtonText}>{greatSchoolsText}</Text>
        </Pressable>
      </View>

      <View style={styles.homeButtonContainer}>
        <Pressable style={styles.homeButton} onPress={() => router.push("/")}>
          <Text style={styles.homeButtonText}>{returnHomeText}</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    backgroundColor: "white",
  },

  textRow: {
    flexDirection: "row",
    backgroundColor: "#6699AB",
    paddingBottom: 16,
  },

  textRowWhite: {
    flexDirection: "row",
    backgroundColor: "white",
    paddingBottom: 16,
  },

  top: {
    flex: 1,
    backgroundColor: "white",
    paddingBottom: 16,
  },

  bottom: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    height: "100%",
    paddingTop: 8,
  },

  title: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },

  titleBlue: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    color: "#6699AB",
  },

  basicText: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "left",
    color: "black",
  },

  cursiveText: {
    fontSize: 36,
    fontFamily: "cursive",
    color: "#black",
  },

  button: {
    width: 260,
    backgroundColor: "#e7f4e7",
    borderColor: "white",
    borderWidth: 5,
    paddingVertical: 16,
    borderRadius: 25,
    marginVertical: 10,
  },

  buttonText: {
    color: "#6699AB",
    fontSize: 12,
    fontWeight: "600",
    textAlign: "center",
  },

  middle: {
    flex: 1,
    justifyContent: "center",
    width: "100%",
    alignItems: "center",
    backgroundColor: "#90ae904f",
  },

  bottomButton: {
    width: "80%",
    backgroundColor: "#6699AB",
    paddingVertical: 15,
    borderRadius: 10,
    borderColor: "black",
    borderWidth: 3,
    alignItems: "center",
    marginVertical: 10,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },

  bottomButtonText: {
    color: "white",
    fontSize: 12,
    fontWeight: "600",
    textAlign: "center",
  },

  smallText: {
    color: "black",
    fontSize: 12,
    fontWeight: "600",
    textAlign: "center",
  },

  linkText: {
    color: "blue",
    fontSize: 12,
    fontWeight: "600",
    textAlign: "center",
    textDecorationLine: "underline",
  },

  textBox: {
    borderWidth: 1,
    borderColor: "black",
    padding: 4,
    marginHorizontal: 8,
    marginTop: 8,
  },

  titleTextBox: {
    borderWidth: 1,
    borderColor: "black",
    padding: 4,
    paddingHorizontal: 50,
    marginHorizontal: 8,
    marginTop: 8,
  },

  homeButtonContainer: {
    marginTop: 32,
    marginBottom: 24,
    alignItems: "center",
  },

  homeButton: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderWidth: 2,
    borderColor: "#6699AB",
    borderRadius: 20,
    backgroundColor: "white",
  },

  homeButtonText: {
    color: "#6699AB",
    fontSize: 14,
    fontWeight: "600",
  },
});
