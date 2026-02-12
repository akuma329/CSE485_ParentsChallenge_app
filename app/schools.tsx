import {
  Linking,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

type SchoolOption = {
  title: string;
  color: string;
  url: string;
};

const OPTIONS: SchoolOption[] = [
  {
    title: "Eastern El Paso County",
    color: "#C62828",
    url: "https://parentschallenge.org/choice-options/eastern-el-paso-county/", 
  },
  {
    title: "Pueblo County",
    color: "#0B7D0B",
    url: "https://parentschallenge.org/choice-options/pueblo-county/",
  },
  {
    title: "Pikes Peak Region",
    color: "#0B5A88",
    url: "https://parentschallenge.org/choice-options/pikes-peak-region/",
  },
  {
    title: "Teller County",
    color: "#D8742E",
    url: "https://parentschallenge.org/choice-options/teller-county/",
  },
  {
    title: "Online / Homeschooling",
    color: "#F4C430",
    url: "https://parentschallenge.org/choice-options/online-homeschool/",
  },
];

export default function Schools() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={styles.scroll}>
        {/* Header */}
        <Text style={styles.header}>Our School Choices</Text>

        {/* Description Box */}
        <View style={styles.descriptionBox}>
          <Text style={styles.descriptionText}>
            At Parents Challenge, we believe that every child deserves access to
            a quality education that fits their unique needs. We empower parents
            by providing the resources and support needed to make informed
            decisions about their children’s education.
          </Text>

          <Text style={styles.descriptionText}>
            Simply click on a county below to view a list of public, private, and
            charter schools in that region. Your child’s future starts with the
            right choice—let us help you find the best fit!
          </Text>
        </View>

        {/* School Options */}
        {OPTIONS.map((option) => (
          <TouchableOpacity
            key={option.title}
            style={[styles.card, { backgroundColor: option.color }]}
            onPress={() => Linking.openURL(option.url)}
            activeOpacity={0.85}
          >
            <Text style={styles.cardText}>{option.title}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  scroll: {
    padding: 20,
    paddingBottom: 40,
  },
  header: {
    fontSize: 28,
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 16,
  },
  descriptionBox: {
    borderWidth: 2,
    borderColor: "#B7C2B8",
    padding: 16,
    marginBottom: 24,
  },
  descriptionText: {
    fontSize: 14,
    textAlign: "center",
    marginBottom: 12,
    lineHeight: 20,
  },
  card: {
    height: 120,
    borderRadius: 6,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
  },
  cardText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
    textAlign: "center",
  },
});
