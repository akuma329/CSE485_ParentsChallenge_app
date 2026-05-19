import React, { useContext } from "react";
import {
  Linking,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { LanguageContext } from "../LanguageContext";
import { translations } from "../translations";

export default function empowerment_sessions() {
  const { isSpanish } = useContext(LanguageContext);

  const titleText = isSpanish
    ? translations.es.empowermentTitle
    : translations.en.empowermentTitle;

  const calendarButtonText = isSpanish
    ? translations.es.empowermentCalendarButton
    : translations.en.empowermentCalendarButton;

  const donorViewButtonText = isSpanish
    ? translations.es.empowermentDonorViewButton
    : translations.en.empowermentDonorViewButton;

  const sectionTitle = isSpanish
    ? translations.es.empowermentSectionTitle
    : translations.en.empowermentSectionTitle;

  const dateText = isSpanish
    ? translations.es.empowermentDateText
    : translations.en.empowermentDateText;

  const timeText = isSpanish
    ? translations.es.empowermentTimeText
    : translations.en.empowermentTimeText;

  const locationText = isSpanish
    ? translations.es.empowermentLocationText
    : translations.en.empowermentLocationText;

  const registeredSessions = [
    {
      title: "Family Empowerment Workshop",
      date: "October 14, 2026",
      time: "6:00 PM - 7:30 PM",
      location: "Parents Challenge Main Center",
    },
  ];

  const openCalendar = () => {
    Linking.openURL(
      "https://www.canva.com/design/DAGqD3cyJb4/hDFZbiQUJOQ4XZUtQnDfWw/view?utm_content=DAGqD3cyJb4&utm_campaign=designshare&utm_medium=link2&utm_source=uniquelinks&utlId=h9770dc33d6",
    );
  };

  const openDonorView = () => {
    Linking.openURL("https://app.donorview.com/EVT/Event/ListAll");
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>{titleText}</Text>

      <Pressable style={styles.button} onPress={openCalendar}>
        <Text style={styles.buttonText}>{calendarButtonText}</Text>
      </Pressable>

      <Pressable style={styles.button} onPress={openDonorView}>
        <Text style={styles.buttonText}>{donorViewButtonText}</Text>
      </Pressable>

      <Text style={styles.sectionTitle}>{sectionTitle}</Text>

      {registeredSessions.map((session, index) => (
        <View key={index} style={styles.sessionBox}>
          <Text style={styles.sessionTitle}>{session.title}</Text>
          <Text style={styles.sessionText}>
            {dateText}: {session.date}
          </Text>
          <Text style={styles.sessionText}>
            {timeText}: {session.time}
          </Text>
          <Text style={styles.sessionText}>
            {locationText}: {session.location}
          </Text>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    padding: 24,
    paddingTop: 50,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  button: {
    width: 280,
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
  sectionTitle: {
    fontSize: 22,
    fontWeight: "bold",
    marginTop: 30,
    marginBottom: 15,
    textAlign: "center",
  },
  sessionBox: {
    width: 300,
    backgroundColor: "#f2f2f2",
    borderRadius: 14,
    padding: 16,
    marginBottom: 15,
  },
  sessionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  sessionText: {
    fontSize: 16,
    marginBottom: 4,
  },
});
