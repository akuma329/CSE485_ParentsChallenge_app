import { useRouter } from "expo-router";
import { doc, getDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import {
  Alert,
  Linking,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import { db } from "../firebaseConfig";

export default function Parents() {
  const router = useRouter();
  const [canvaLink, setCanvaLink] = useState<string | null>(null);

  useEffect(() => {
    const fetchLink = async () => {
      try {
        const docRef = doc(db, "settings", "canvaLink");
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setCanvaLink(docSnap.data().schedule);
        }
      } catch (error) {
        console.error("Error fetching canvaLink:", error);
      }
    };
    fetchLink();
  }, []);

  const openEmpowermentLink = () => {
    if (canvaLink) {
      Linking.openURL(canvaLink);
    } else {
      Alert.alert("Loading", "Still fetching the latest schedule. Please try again in a second.");
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.button}
        onPress={() =>
          Linking.openURL(
            "https://www.canva.com/design/DAGGnx3Wj7Q/oGDOeHihX-xaIV5lHiNrYA/view?utm_content=DAGGnx3Wj7Q&utm_campaign=designshare&utm_medium=link2&utm_source=uniquelinks&utlId=h9b6e85cad5",
          )
        }
      >
        <Text style={styles.buttonText}>Parents Info</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={openEmpowermentLink}
      >
        <Text style={styles.buttonText}>Empowerment Sessions</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() =>
          Linking.openURL(
            "https://www.youtube.com/channel/UCQ-QKYDWD2Ld0I5YZdgOQ9A/videos",
          )
        }
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
    backgroundColor: "#6699AB",
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