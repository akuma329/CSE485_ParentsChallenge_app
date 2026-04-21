import { updatePassword } from "firebase/auth";
import React, { useState } from "react";
import {
  Alert,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { auth } from "../firebaseConfig";

export default function account_settings() {
  const [passwordModalVisible, setPasswordModalVisible] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [notificationsOn, setNotificationsOn] = useState(true);
  const [bannerMessage, setBannerMessage] = useState("");

  const showBanner = (message: string) => {
    setBannerMessage(message);
    setTimeout(() => {
      setBannerMessage("");
    }, 2000);
  };

  const handleNotifications = () => {
    const newValue = !notificationsOn;
    setNotificationsOn(newValue);

    if (newValue) {
      showBanner("Notifications On");
    } else {
      showBanner("Notifications Off");
    }
  };

  const handlePasswordChange = async () => {
    const user = auth.currentUser;

    if (!user) {
      showBanner("No user found.");
      return;
    }

    if (newPassword.length < 6) {
      Alert.alert("Weak Password", "Password must be at least 6 characters.");
      return;
    }

    try {
      await updatePassword(user, newPassword);
      setPasswordModalVisible(false);
      setNewPassword("");
      showBanner("Password Updated ✅");
    } catch (error: any) {
      console.error(error.code);
      if (error.code === "auth/requires-recent-login") {
        Alert.alert(
          "Security Timeout",
          "For your security, please log out and log back in to change your password."
        );
      } else {
        showBanner("Failed to update password.");
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Account Settings</Text>

      {bannerMessage !== "" && (
        <View style={styles.banner}>
          <Text style={styles.bannerText}>{bannerMessage}</Text>
        </View>
      )}

      <View>
        <Pressable style={styles.button}>
          <Text style={styles.buttonText}>
            Change Language {"\n"}Cambiar Idioma
          </Text>
        </Pressable>

        <Pressable style={styles.button} onPress={handleNotifications}>
          <Text style={styles.buttonText}>
            {notificationsOn
              ? "Turn Notifications Off"
              : "Turn Notifications On"}
          </Text>
        </Pressable>

        <Pressable
          style={styles.button}
          onPress={() => setPasswordModalVisible(true)}
        >
          <Text style={styles.buttonText}>Change User Password</Text>
        </Pressable>

        <Modal visible={passwordModalVisible} transparent={true}>
          <View style={styles.modalContainer}>
            <View style={styles.modalBox}>
              <Text>Enter New Password</Text>
              <TextInput
                style={styles.input}
                value={newPassword}
                onChangeText={setNewPassword}
                placeholder="New password"
                secureTextEntry={true}
              />
              <View style={styles.modalButtons}>
                <Pressable onPress={() => setPasswordModalVisible(false)}>
                  <Text>Cancel</Text>
                </Pressable>
                <Pressable
                  style={styles.enterButton}
                  onPress={handlePasswordChange}
                >
                  <Text style={styles.enterButtonText}>Enter</Text>
                </Pressable>
              </View>
            </View>
          </View>
        </Modal>
      </View>
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
  banner: {
    backgroundColor: "green",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 12,
    marginBottom: 10,
  },
  bannerText: {
    color: "white",
    fontWeight: "600",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.3)",
  },
  modalBox: {
    width: 250,
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
  },
  input: {
    width: 200,
    borderWidth: 1,
    marginVertical: 10,
    padding: 8,
  },
  modalButtons: {
    flexDirection: "row",
    gap: 20,
  },
  enterButton: {
    backgroundColor: "#6699AB",
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 12,
  },
  enterButtonText: {
    color: "white",
    fontWeight: "600",
  },
});
