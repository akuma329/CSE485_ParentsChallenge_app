import { StyleSheet, Text, View } from "react-native";

export default function event_schedule() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Event Schedule</Text>
      <Text style={styles.subtitle}>Events go here.</Text>
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