import React, { useContext } from "react";
import {
  Linking,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { LanguageContext } from "../LanguageContext";
import { translations } from "../translations";

type SchoolOption = {
  title: string;
  color: string;
  url: string;
};

export default function Schools() {
  const { isSpanish } = useContext(LanguageContext);

  const headerText = isSpanish
    ? translations.es.schoolsHeaderText
    : translations.en.schoolsHeaderText;

  const descriptionText1 = isSpanish
    ? translations.es.schoolsDescriptionText1
    : translations.en.schoolsDescriptionText1;

  const descriptionText2 = isSpanish
    ? translations.es.schoolsDescriptionText2
    : translations.en.schoolsDescriptionText2;

  const easternCountyText = isSpanish
    ? translations.es.schoolsEasternCountyText
    : translations.en.schoolsEasternCountyText;

  const puebloCountyText = isSpanish
    ? translations.es.schoolsPuebloCountyText
    : translations.en.schoolsPuebloCountyText;

  const pikesPeakText = isSpanish
    ? translations.es.schoolsPikesPeakText
    : translations.en.schoolsPikesPeakText;

  const tellerCountyText = isSpanish
    ? translations.es.schoolsTellerCountyText
    : translations.en.schoolsTellerCountyText;

  const onlineHomeschoolText = isSpanish
    ? translations.es.schoolsOnlineHomeschoolText
    : translations.en.schoolsOnlineHomeschoolText;

  const OPTIONS: SchoolOption[] = [
    {
      title: easternCountyText,
      color: "#C62828",
      url: "https://parentschallenge.org/choice-options/eastern-el-paso-county/",
    },
    {
      title: puebloCountyText,
      color: "#0B7D0B",
      url: "https://parentschallenge.org/choice-options/pueblo-county/",
    },
    {
      title: pikesPeakText,
      color: "#0B5A88",
      url: "https://parentschallenge.org/choice-options/pikes-peak-region/",
    },
    {
      title: tellerCountyText,
      color: "#D8742E",
      url: "https://parentschallenge.org/choice-options/teller-county/",
    },
    {
      title: onlineHomeschoolText,
      color: "#F4C430",
      url: "https://parentschallenge.org/choice-options/online-homeschool/",
    },
  ];

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={styles.scroll}>
        {/* Header */}
        <Text style={styles.header}>{headerText}</Text>

        {/* Description Box */}
        <View style={styles.descriptionBox}>
          <Text style={styles.descriptionText}>{descriptionText1}</Text>

          <Text style={styles.descriptionText}>{descriptionText2}</Text>
        </View>

        {/* School Options */}
        {OPTIONS.map((option) => (
          <TouchableOpacity
            key={option.title}
            style={[styles.card, { backgroundColor: option.color }]}
            onPress={() => Linking.openURL(option.url)}
            activeOpacity={0.85}
          >
            <Text style={styles.cardText}>{option.title}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  scroll: {
    padding: 20,
    paddingBottom: 40,
  },

  header: {
    fontSize: 28,
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 16,
  },

  descriptionBox: {
    borderWidth: 2,
    borderColor: "#B7C2B8",
    padding: 16,
    marginBottom: 24,
  },

  descriptionText: {
    fontSize: 14,
    textAlign: "center",
    marginBottom: 12,
    lineHeight: 20,
  },

  card: {
    height: 120,
    borderRadius: 6,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
  },

  cardText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
    textAlign: "center",
  },
});
