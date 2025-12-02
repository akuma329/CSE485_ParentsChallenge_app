import { useLocalSearchParams } from "expo-router";
import {
    Image,
    ScrollView,
    StyleSheet,
    Text,
    View,
} from "react-native";
import { boardMembers } from "../../constants/boardMembers";

export default function BoardMemberDetail() {
  const { id } = useLocalSearchParams();
  const member = boardMembers.find((m) => m.id === id);

  if (!member) {
    return (
      <View style={styles.centered}>
        <Text>Board member not found.</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {member.image ? (
        <Image source={member.image} style={styles.photo} />
      ) : (
        <View style={styles.photoPlaceholder}>
          <Text style={styles.photoPlaceholderText}>Photo</Text>
        </View>
      )}

      <Text style={styles.name}>{member.name}</Text>
      {member.years ? <Text style={styles.years}>{member.years}</Text> : null}
      {member.subtitle ? (
        <Text style={styles.subtitle}>{member.subtitle}</Text>
      ) : null}

      <Text style={styles.sectionTitle}>
        Honoring our board member, {member.name}.
      </Text>

      <Text style={styles.bodyText}>
        {member.description || "Will add description later."}
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  content: {
    paddingTop: 32,
    paddingHorizontal: 20,
    paddingBottom: 40,
    alignItems: "center",
  },
  centered: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  photo: {
    width: 160,
    height: 160,
    borderRadius: 16,
    marginBottom: 20,
  },
  photoPlaceholder: {
    width: 160,
    height: 160,
    borderRadius: 16,
    marginBottom: 20,
    backgroundColor: "#E5E7EB",
    alignItems: "center",
    justifyContent: "center",
  },
  photoPlaceholderText: {
    color: "#6B7280",
  },
  name: {
    fontSize: 24,
    fontWeight: "700",
    textAlign: "center",
  },
  years: {
    fontSize: 13,
    color: "#6B7280",
    marginTop: 4,
  },
  subtitle: {
    fontSize: 14,
    color: "#4B5563",
    marginTop: 4,
    textAlign: "center",
  },
  sectionTitle: {
    marginTop: 24,
    fontSize: 16,
    fontWeight: "700",
    textAlign: "center",
  },
  bodyText: {
    marginTop: 16,
    fontSize: 14,
    lineHeight: 20,
    color: "#374151",
    textAlign: "left",
  },
});
