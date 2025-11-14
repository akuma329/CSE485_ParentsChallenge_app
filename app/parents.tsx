import { useRouter } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function Parents() {
  const router = useRouter();

  return (
    <View style={styles.container}>

      <TouchableOpacity
        style={styles.button}
        onPress={() => router.push("/parent_info" as any)}
      >
        <Text style={styles.buttonText}>Parents Info</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => router.push("/empowerment_sessions" as any)}
      >
        <Text style={styles.buttonText}>Empowerment Sessions</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => router.push("/videos" as any)}
      >
        <Text style={styles.buttonText}>Videos</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f9f9f9",
    paddingHorizontal: 20,
  },
  button: {
    width: "80%",
    backgroundColor: "#4a90e2",
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: "center",
    marginVertical: 10,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },
});
