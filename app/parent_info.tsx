import * as Linking from "expo-linking";
import { router } from "expo-router";
import React from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
export default function Parent_Info() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.top}>
        <Text style={styles.textRow}>
          <Text style={styles.title}>SCHOOL</Text>
          <Text style={styles.cursiveText}> assessment {"\n"}</Text>
          <Text style={styles.title}>CONSIDERATIONS</Text>
        </Text>
        <View style={styles.textBox}>
          <Text style={styles.basicText}>
            {" "}
            ○ Academics {"\n"} ○ Quality of Instruction {"\n"} ○ Curriculum{" "}
            {"\n"} ○ Gifted & Talented Program {"\n"} ○ Teacher Longevity
            Special Need Services {"\n"} ○ Sports {"\n"} ○ Extracurricular
            Activities {"\n"} ○ Facilities {"\n"} ○ Transportation {"\n"} ○
            Reputation
          </Text>
          <Text style={styles.titleBlue}>
            {"\n"}What does the school offer that meets your family's
            educational goals and expectations?
          </Text>
        </View>

        <View style={styles.textBox}>
          <Text style={styles.smallText}>
            Name of nearby, better performing school:{" "}
            <Text
              style={styles.linkText}
              onPress={() => Linking.openURL("https://www.greatschools.org/")}
            >
              Access your child’s school via Great Schools
            </Text>
          </Text>
        </View>
      </View>

      <View style={styles.middle}>
        <View style={styles.titleTextBox}>
          <Text style={styles.title}>School Assessments</Text>
        </View>

        <Text style={styles.basicText}>
          {"\n"}Assess your child's school/support groups:
        </Text>
        <Pressable
          style={styles.button}
          onPress={() => Linking.openURL("https://schoolchoiceforkids.org/")}
        >
          <Text style={styles.buttonText}>Public/Charter School Grades</Text>
        </Pressable>

        <Pressable
          style={styles.button}
          onPress={() => Linking.openURL("http://www.homeschoolfacts.com/")}
        >
          <Text style={styles.buttonText}>Homeschool Resources</Text>
        </Pressable>

        <Pressable
          style={styles.button}
          onPress={() =>
            Linking.openURL("https://www.privateschoolreview.com/")
          }
        >
          <Text style={styles.buttonText}>Private School Review</Text>
        </Pressable>
      </View>

      <View style={styles.bottom}>
        <View style={styles.titleTextBox}>
          <Text style={styles.textRowWhite}>
            <Text style={styles.title}>PARENT</Text>
            <Text style={styles.cursiveText}> information</Text>
          </Text>
        </View>

        <Pressable
          style={styles.bottomButton}
          onPress={() => Linking.openURL("https://schoolchoiceforkids.org/")}
        >
          <Text style={styles.bottomButtonText}>School Choice Resources</Text>
        </Pressable>

        <Pressable
          style={styles.bottomButton}
          onPress={() => Linking.openURL("https://www.pta.org/")}
        >
          <Text style={styles.bottomButtonText}>National PTA</Text>
        </Pressable>

        <Pressable
          style={styles.bottomButton}
          onPress={() => Linking.openURL("http://www.corestandards.org/")}
        >
          <Text style={styles.bottomButtonText}>Common Core Standards</Text>
        </Pressable>

        <Pressable
          style={styles.bottomButton}
          onPress={() =>
            Linking.openURL(
              "https://www2.ed.gov/parents/academic/involve/homework/index.html",
            )
          }
        >
          <Text style={styles.bottomButtonText}>Homework Tips</Text>
        </Pressable>

        <Pressable
          style={styles.bottomButton}
          onPress={() => Linking.openURL("https://www.greatschools.org/")}
        >
          <Text style={styles.bottomButtonText}>Great Schools</Text>
        </Pressable>
      </View>

      <View style={styles.homeButtonContainer}>
        <Pressable style={styles.homeButton} onPress={() => router.push("/")}>
          <Text style={styles.homeButtonText}>Return to Home</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    // height: "100%",
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
    // justifyContent: "center",
    // alignItems: "center",

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
    // fontStyle: "cursive",
    fontFamily: "cursive",
    color: "#black",
  },

  button: {
    width: 260,
    backgroundColor: "#e7f4e7", //#6699AB default PC color
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
