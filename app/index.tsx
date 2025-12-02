import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

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

      <Image
        source={require("../assets/images/PC_Location-Logo_CO-100.jpg")}
        style={styles.topImage}
        resizeMode="contain"
      />

      <LinearGradient
      colors={["#6696AB", "#3F6F80"]}
      style={styles.banner}
      >
        <Text style={styles.bannerText}>
          We see a tomorrow where all children have access to a quality education 
          that meets their individual needs and prepares them to be productive, 
          contributing citizens.
        </Text>
      </LinearGradient>
      
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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
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
    backgroundColor: "#6696AB",
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
    marginTop: 50,
    gap: 15,
  },
  button: {
    width: "40%",
    backgroundColor: "#6696AB",
    paddingVertical: 20,
    borderRadius: 10,
    overflow: "hidden",
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
  topImage: {
    width: "80%",
    height: 160,
    marginTop: 0,
    marginBottom: 10,
  },
  banner: {
  marginTop: 30,
  backgroundColor: "#364057",
  padding: 20,
  borderRadius: 0,
  width: "100%",
  alignItems: "center",
  shadowColor: "#000",
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.2,
  shadowRadius: 4,
},
bannerText: {
  color: "#fff",
  fontSize: 16,
  fontWeight: "500",
  textAlign: "center",
  lineHeight: 22,
},
});
