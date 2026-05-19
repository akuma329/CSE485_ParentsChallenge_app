import React, { useContext, useState } from "react";
import {
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { LanguageContext } from "../LanguageContext";
import { translations } from "../translations";

export default function account_settings() {
  const [passwordModalVisible, setPasswordModalVisible] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [notificationsOn, setNotificationsOn] = useState(true);
  const [bannerMessage, setBannerMessage] = useState("");

  const { isSpanish, setIsSpanish } = useContext(LanguageContext);
  const text = isSpanish ? translations.es : translations.en;

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
      showBanner(text.notificationsOnMessage);
    } else {
      showBanner(text.notificationsOffMessage);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{text.settingsTitle}</Text>

      {bannerMessage !== "" && (
        <View style={styles.banner}>
          <Text style={styles.bannerText}>{bannerMessage}</Text>
        </View>
      )}

      <View>
        <Pressable
          style={styles.button}
          onPress={() => setIsSpanish(!isSpanish)}
        >
          <Text style={styles.buttonText}>{text.changeLanguage}</Text>
        </Pressable>

        {/* PARENTS CHALLENGE STAFF: The following code block is for notifications button, should the feature be implemented
        
        <Pressable style={styles.button} onPress={handleNotifications}>
          <Text style={styles.buttonText}>
            {notificationsOn
              ? text.notificationsOffButton
              : text.notificationsOnButton}
          </Text>
        </Pressable> */}

        <Pressable
          style={styles.button}
          onPress={() => setPasswordModalVisible(true)}
        >
          <Text style={styles.buttonText}>{text.changePassword}</Text>
        </Pressable>

        <Modal visible={passwordModalVisible} transparent={true}>
          <View style={styles.modalContainer}>
            <View style={styles.modalBox}>
              <Text>{text.enterNewPassword}</Text>
              <TextInput
                style={styles.input}
                value={newPassword}
                onChangeText={setNewPassword}
                placeholder={text.newPasswordPlaceholder}
                secureTextEntry={true}
              />
              <View style={styles.modalButtons}>
                <Pressable onPress={() => setPasswordModalVisible(false)}>
                  <Text>{text.cancel}</Text>
                </Pressable>
                <Pressable
                  style={styles.enterButton}
                  onPress={() => {
                    setPasswordModalVisible(false);
                    setNewPassword("");
                    showBanner(text.passwordUpdated);
                  }}
                >
                  <Text style={styles.enterButtonText}>{text.enter}</Text>
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
