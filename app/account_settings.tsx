import { StyleSheet, Text, View } from "react-native";

export default function account_settings() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Account Settings</Text>
      <Text style={styles.subtitle}>Settings go here.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 16,
    color: "#555",
  },
});