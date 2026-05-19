import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import React, { useContext, useEffect, useRef, useState } from "react";
import {
  Dimensions,
  Image,
  Linking,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { LanguageContext } from "../LanguageContext";
import { translations } from "../translations";

const { width } = Dimensions.get("window");
const CAROUSEL_WIDTH = width - 40;

export default function Index() {
  const [menuOpen, setMenuOpen] = useState(false);
  const router = useRouter();
  const scrollRef = useRef<ScrollView>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const carouselImages = [
    require("../assets/images/carouselpic1.jpeg"),
    require("../assets/images/carouselpic2.jpeg"),
    require("../assets/images/carouselpic3.jpeg"),
    require("../assets/images/carouselpic4.jpeg"),
    require("../assets/images/carouselpic5.jpeg"),
    require("../assets/images/carouselpic6.jpeg"),
    require("../assets/images/carouselpic7.jpeg"),
    require("../assets/images/carouselpic8.jpeg"),
    require("../assets/images/carouselpic9.jpeg"),
    require("../assets/images/carouselpic10.jpeg"),
    require("../assets/images/carouselpic11.jpeg"),
    
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      const nextIndex = (activeIndex + 1) % carouselImages.length;
      setActiveIndex(nextIndex);

      scrollRef.current?.scrollTo({
        x: nextIndex * CAROUSEL_WIDTH,
        animated: true,
      });
    }, 3000);

    return () => clearInterval(interval);
  }, [activeIndex]);

  const { isSpanish } = useContext(LanguageContext);

  const loginText = isSpanish
    ? translations.es.homeLoginText
    : translations.en.homeLoginText;

  const parentsText = isSpanish
    ? translations.es.homeParentsText
    : translations.en.homeParentsText;

  const schoolsText = isSpanish
    ? translations.es.homeSchoolsText
    : translations.en.homeSchoolsText;

  const resourcesText = isSpanish
    ? translations.es.homeResourcesText
    : translations.en.homeResourcesText;

  const contactText = isSpanish
    ? translations.es.homeContactText
    : translations.en.homeContactText;

  const settingsText = isSpanish
    ? translations.es.homeSettingsText
    : translations.en.homeSettingsText;

  const bannerText = isSpanish
    ? translations.es.homeBannerText
    : translations.en.homeBannerText;

  const aboutText = isSpanish
    ? translations.es.homeAboutText
    : translations.en.homeAboutText;

  const boardText = isSpanish
    ? translations.es.homeBoardText
    : translations.en.homeBoardText;

  const eventsText = isSpanish
    ? translations.es.homeEventsText
    : translations.en.homeEventsText;

  const programsText = isSpanish
    ? translations.es.homeProgramsText
    : translations.en.homeProgramsText;

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
          <Text style={styles.loginText}>{loginText}</Text>
        </TouchableOpacity>
      </View>

      {menuOpen && (
        <View style={styles.menu}>
          {[
            { name: parentsText, route: "/parents" },
            { name: schoolsText, route: "/schools" },
            { name: resourcesText, route: "/resources" },
            { name: contactText, route: "/contact" },
            { name: settingsText, route: "/account_settings" },
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

      {/* PHOTO CAROUSEL */}
      <View style={styles.carouselContainer}>
        <ScrollView
          ref={scrollRef}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onMomentumScrollEnd={(event) => {
            const index = Math.round(
              event.nativeEvent.contentOffset.x / CAROUSEL_WIDTH
            );
            setActiveIndex(index);
          }}
        >
          {carouselImages.map((image, index) => (
            <Image
              key={index}
              source={image}
              style={styles.carouselImage}
              resizeMode="cover"
            />
          ))}
        </ScrollView>

        <View style={styles.dotsContainer}>
          {carouselImages.map((_, index) => (
            <View
              key={index}
              style={[
                styles.dot,
                activeIndex === index && styles.activeDot,
              ]}
            />
          ))}
        </View>
      </View>

      <LinearGradient colors={["#6696AB", "#3F6F80"]} style={styles.banner}>
        <Text style={styles.bannerText}>{bannerText}</Text>
      </LinearGradient>

      <View style={styles.buttonGrid}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => router.push("/about")}
        >
          <Text style={styles.buttonText}>{aboutText}</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => router.push("/board")}
        >
          <Text style={styles.buttonText}>{boardText}</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() =>
            Linking.openURL("https://parentschallenge.org/events-activities/")
          }
        >
          <Text style={styles.buttonText}>{eventsText}</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => router.push("/programs")}
        >
          <Text style={styles.buttonText}>{programsText}</Text>
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
  carouselContainer: {
    width: "100%",
    marginBottom: 20,
    alignItems: "center",
  },
  carouselImage: {
    width: CAROUSEL_WIDTH,
    height: 180,
    borderRadius: 12,
    marginRight: 0,
  },
  dotsContainer: {
    flexDirection: "row",
    marginTop: 10,
    justifyContent: "center",
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#c4c4c4",
    marginHorizontal: 4,
  },
  activeDot: {
    backgroundColor: "#6696AB",
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  banner: {
    marginTop: 10,
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