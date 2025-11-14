import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function Index() {
  const [menuOpen, setMenuOpen] = useState(false);
  const router = useRouter();

  return (
    <View style={styles.container}>
      
      <View style={styles.header}>
        <TouchableOpacity onPress={() => setMenuOpen(!menuOpen)}>
          <Ionicons name="menu" size={32} color="black" />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.loginButton}
          onPress={() => router.push("/login" as any)}
        >
          <Text style={styles.loginText}>Login</Text>
        </TouchableOpacity>
      </View>

      
      {menuOpen && (
        <View style={styles.menu}>
          {[
            { name: "Parents", route: "/parents" },
            { name: "Schools", route: "/schools" },
            { name: "Resources", route: "/resources" },
            { name: "Contact Us", route: "/contact" },
          ].map((item) => (
            <TouchableOpacity
              key={item.name}
              style={styles.menuItem}
              onPress={() => {
                setMenuOpen(false);
                router.push(item.route as any);
              }}
            >
              <Text style={styles.menuText}>{item.name}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}

      
      <View style={styles.buttonGrid}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => router.push("/about")}
        >
          <Text style={styles.buttonText}>About Us</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => router.push("/board")}
        >
          <Text style={styles.buttonText}>Board</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => router.push("/events")}
        >
          <Text style={styles.buttonText}>Events</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => router.push("/programs")}
        >
          <Text style={styles.buttonText}>Our Programs</Text>
        </TouchableOpacity>
      </View>

      
      <View style={styles.bottomButtons}>
        <TouchableOpacity style={styles.bottomButton}>
          <Text style={styles.bottomButtonText}>Calendar</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.bottomButton}>
          <Text style={styles.bottomButtonText}>BAND</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.bottomButton}>
          <Text style={styles.bottomButtonText}>DonorView</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9f9f9",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  header: {
    position: "absolute",
    top: 50,
    left: 20,
    right: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    zIndex: 20,
  },
  loginButton: {
    backgroundColor: "#4a90e2",
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 8,
  },
  loginText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  menu: {
    position: "absolute",
    top: 90,
    left: 20,
    backgroundColor: "#ffffff",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 15,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    zIndex: 10,
  },
  menuItem: {
    paddingVertical: 10,
    paddingHorizontal: 5,
  },
  menuText: {
    fontSize: 18,
    color: "#333",
  },
  buttonGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    marginTop: 80,
    gap: 15,
  },
  button: {
    width: "40%",
    backgroundColor: "#4a90e2",
    paddingVertical: 20,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
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
    textAlign: "center",
  },
  bottomButtons: {
    marginTop: 40,
    width: "80%",
    alignItems: "center",
  },
  bottomButton: {
    backgroundColor: "#e1e1e1",
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    marginVertical: 8,
  },
  bottomButtonText: {
    fontSize: 18,
    color: "#333",
    fontWeight: "500",
  },
});
