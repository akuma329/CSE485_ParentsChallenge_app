import * as Linking from "expo-linking";
import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

export default function Other_Resources() {
  return (
    <View style={styles.container}>
      <Pressable
        style={styles.button}
        onPress={() =>
          Linking.openURL("https://parentschallenge.org/parents/tutoring/")
        }
      >
        <Text style={styles.buttonText}>Tutoring</Text>
      </Pressable>

      <Pressable
        style={styles.button}
        onPress={() =>
          Linking.openURL("https://parentschallenge.org/sports-resources/")
        }
      >
        <Text style={styles.buttonText}>Sports</Text>
      </Pressable>

      <Pressable
        style={styles.button}
        onPress={() =>
          Linking.openURL("https://parentschallenge.org/mental-health-resources/")
        }
      >
        <Text style={styles.buttonText}>Mental Health</Text>
      </Pressable>

      <Pressable
        style={styles.button}
        onPress={() =>
          Linking.openURL("https://parentschallenge.org/parents/resources/")
        }
      >
        <Text style={styles.buttonText}>More Resources</Text>
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
