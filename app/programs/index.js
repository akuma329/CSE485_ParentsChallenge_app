import { Stack } from "expo-router";
import {
  Alert,
  Image,
  Linking,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from "react-native";


const NON_PROFIT_ANALYSIS_2021_URL = "https://parentschallenge.org/wp-content/uploads/2021/03/Parents-Challenge-2021-Analytics.pdf";
const NON_PROFIT_ANALYSIS_2022_URL = "https://parentschallenge.org/wp-content/uploads/2023/05/Parents-Challenge-2022-Annual-Report-1.pdf";
const APPLICATION_URL = "https://parentschallenge.org/apply/financial-aid/";


const HERO_BANNER = require("../../assets/programs/program-banner.jpg");
const TRANSPARENCY_BADGE = require("../../assets/programs/excellence-in-giving-transparent.png");

const PARENTAL_EMPOWERMENT_ICON = require("../../assets/programs/parental-empowerment-icon.jpg");
const SCHOLARSHIPS_GRANTS_ICON = require("../../assets/programs/scholarships-grants-icon.jpg");
const STUDENT_SERVICES_ICON = require("../../assets/programs/student-services-icon.jpg");
const COMMUNITY_ENGAGEMENT_ICON = require("../../assets/programs/community-engagement-icon.jpg");

const ANKRUM_FAMILY_IMAGE = require("../../assets/programs/ankrum-family.jpg");
const STANDARDS_OF_EXCELLENCE_IMAGE = require("../../assets/programs/standards-of-excellence.png");

const activityCards = [
  {
    id: "parental-empowerment",
    title: "PARENTAL EMPOWERMENT",
    image: PARENTAL_EMPOWERMENT_ICON,
    description:
      "Designed in collaboration with parents, our holistic Empowerment Sessions facilitate parental engagement in the educational process by teaching families to be stronger education consumers. Sessions provide information on educational resources, parenting skills, monitoring children's progress, selecting supplemental support and materials, and interacting with teachers, administrators, and education boards.",
  },
  {
    id: "scholarships-grants",
    title: "SCHOLARSHIPS + GRANTS",
    image: SCHOLARSHIPS_GRANTS_ICON,
    description:
      "Parents Challenge provides low-income families financial support for educational choice, whether it is private, public, charter public, or home school. Examples include partial private school tuition scholarships, tutoring, assessments, transportation, computers, and home school support. We also offer college scholarships for Character and Leadership and STEM career fields.",
  },
  {
    id: "student-services",
    title: "STUDENT SERVICES",
    image: STUDENT_SERVICES_ICON,
    description:
      "Parents Challenge provides a wide range of services that assist with evaluation, monitoring, and improvement of academic and cognitive skills, as well as developing coping and life skills. We provide specialized student programs focused on Character, Leadership, STEM, and internship support. Students and parents are expected to record academic grades, standardized scores, and extracurricular activities each semester in a student journal.",
  },
  {
    id: "community-engagement",
    title: "COMMUNITY ENGAGEMENT",
    image: COMMUNITY_ENGAGEMENT_ICON,
    description:
      "Parents Challenge facilitates outreach and collaboration with other service-providing organizations and companies throughout the community and country. We work to maximize resources, minimize duplication, and better support families. Empowerment sessions are made available to the public at no cost, and families are encouraged to give back through school or community volunteer service.",
  },
];

const incomeCriteria = [
  "2 people: $36,482",
  "3 people: $45,991",
  "4 people: $55,500",
  "5 people: $65,009",
  "6 people: $74,518",
];

const choiceCards = [
  {
    title: "Private School Scholarships",
    description:
      "Scholarships up to $2500 per year for partial tuition expenses may be awarded to eligible families. Parents can also request funds for technology in the home, school fees, and summer programs.",
  },
  {
    title: "Traditional Public School and Charter Public School Grants",
    description:
      "Grants up to $1200 per year for academic enhancement programs such as tutoring, online programs, computers, academic software, required uniforms, transportation, activity fees, and other approved uses. Grants can also be used for summer school programs.",
  },
  {
    title: "Home School Grants",
    description:
      "Grants up to $1200 per year for curricular materials, extracurricular activities, technology, or other expenses approved by Parents Challenge staff.",
  },
];

function SectionTitle({ leftLine = true, rightLine = true, prefix, accent }) {
  return (
    <View style={styles.sectionTitleRow}>
      {leftLine ? <View style={styles.sectionLine} /> : <View style={styles.sectionLineSpacer} />}
      <Text style={styles.sectionTitleText}>
        <Text style={styles.sectionTitlePrefix}>{prefix} </Text>
        <Text style={styles.sectionTitleAccent}>{accent}</Text>
      </Text>
      {rightLine ? <View style={styles.sectionLine} /> : <View style={styles.sectionLineSpacer} />}
    </View>
  );
}

function LinkButton({ label, onPress, secondary = false }) {
  return (
    <Pressable
      accessibilityRole="button"
      onPress={onPress}
      style={({ pressed }) => [
        styles.linkButton,
        secondary && styles.linkButtonSecondary,
        pressed && styles.linkButtonPressed,
      ]}
    >
      <Text style={[styles.linkButtonText, secondary && styles.linkButtonTextSecondary]}>
        {label}
      </Text>
    </Pressable>
  );
}

function ActivityCard({ item, fullWidth }) {
  return (
    <View style={[styles.activityCard, fullWidth ? styles.activityCardFull : styles.activityCardHalf]}>
      <Image source={item.image} style={styles.activityIcon} resizeMode="contain" />
      <Text style={styles.activityTitle}>{item.title}</Text>
      <Text style={styles.activityText}>{item.description}</Text>
    </View>
  );
}

function ChoiceCard({ title, description }) {
  return (
    <View style={styles.choiceCard}>
      <Text style={styles.choiceTitle}>• {title}</Text>
      <Text style={styles.choiceText}>{description}</Text>
    </View>
  );
}

export default function ProgramsPage() {
  const { width } = useWindowDimensions();

  const isTablet = width >= 768;
  const isLargeTablet = width >= 1024;

  const contentWidth = Math.min(width - 24, 1200);

  const heroHeight = isLargeTablet ? 360 : isTablet ? 280 : 220;
  const badgeSize = isTablet ? 170 : 145;
  const familyImageHeight = isLargeTablet ? 420 : isTablet ? 340 : 240;
  const standardsImageHeight = isLargeTablet ? 760 : isTablet ? 580 : 360;

  const openLink = async (url) => {
    if (!url || !url.startsWith("http")) {
      Alert.alert(
        "Add the link first",
        "Paste the correct website link into the constant at the top of this file."
      );
      return;
    }

    try {
      const supported = await Linking.canOpenURL(url);
      if (!supported) {
        Alert.alert("Unable to open link", url);
        return;
      }
      await Linking.openURL(url);
    } catch (error) {
      Alert.alert("Unable to open link", "Please check the URL and try again.");
    }
  };

  return (
    <>
      <Stack.Screen options={{ title: "Programs" }} />

      <ScrollView
        style={styles.screen}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={[styles.pageContainer, { width: contentWidth }]}>
          <Image
            source={HERO_BANNER}
            style={[styles.heroImage, { height: heroHeight }]}
            resizeMode="cover"
          />

          <View style={styles.introFrame}>
            <SectionTitle prefix="OUR" accent="program" />

            <Text style={styles.programDescription}>
              Parents Challenge disrupts the legacy of educational failure by
              empowering parents. We provide our families with information,
              training, mentoring, tools, and financial resources to equip them
              to choose the education they think best for their children.
            </Text>

            <Image
              source={TRANSPARENCY_BADGE}
              style={[styles.badgeImage, { width: badgeSize, height: badgeSize }]}
              resizeMode="contain"
            />

            <View style={styles.analysisButtons}>
              <LinkButton
                label="2021 NON-PROFIT ANALYSIS"
                onPress={() => openLink(NON_PROFIT_ANALYSIS_2021_URL)}
              />
              <LinkButton
                label="2022 NON-PROFIT ANALYSIS"
                onPress={() => openLink(NON_PROFIT_ANALYSIS_2022_URL)}
              />
            </View>
          </View>

          <View style={styles.bannerSection}>
            <Text style={styles.bannerSectionText}>
              THE PARENTS CHALLENGE PROGRAM IS BUILT UPON FOUR KEY ACTIVITIES:
            </Text>
          </View>

          <View style={styles.activitiesGrid}>
            {activityCards.map((item) => (
              <ActivityCard
                key={item.id}
                item={item}
                fullWidth={!isTablet}
              />
            ))}
          </View>

          <View style={styles.financialAidSection}>
            <Text style={styles.majorSectionHeading}>FINANCIAL AID + PROGRAM CHOICES</Text>

            <View
              style={[
                styles.financialAidTopRow,
                { flexDirection: isTablet ? "row" : "column" },
              ]}
            >
              <View style={[styles.infoCard, styles.criteriaCard, isTablet && styles.halfCard]}>
                <Text style={styles.infoCardTitle}>Sample Income Criteria</Text>

                {incomeCriteria.map((line) => (
                  <Text key={line} style={styles.criteriaLine}>
                    • {line}
                  </Text>
                ))}

                <Text style={styles.criteriaNote}>
                  Note: Add $9,509 for each additional person.
                </Text>

                <Text style={styles.infoParagraph}>
                  Parents can qualify for financial aid if they meet the income
                  criteria.
                </Text>

                <Text style={styles.infoParagraph}>
                  Financial aid is based on need, and families must meet federal
                  income eligibility criteria for Free and Reduced Lunch.
                </Text>
              </View>

              <View style={[styles.infoCard, isTablet && styles.halfCard]}>
                <Text style={styles.infoCardTitle}>Parents can select one of three “Choices”</Text>

                {choiceCards.map((choice) => (
                  <ChoiceCard
                    key={choice.title}
                    title={choice.title}
                    description={choice.description}
                  />
                ))}
              </View>
            </View>

            <View style={styles.applicationCard}>
              <Text style={styles.applicationText}>
                The application is available on the website and is open year-round for new families.
              </Text>

              <LinkButton
                label="OPEN APPLICATION WEBSITE"
                onPress={() => openLink(APPLICATION_URL)}
                secondary
              />
            </View>
          </View>

          <View
            style={[
              styles.testimonialSection,
              { flexDirection: isTablet ? "row" : "column" },
            ]}
          >
            <Image
              source={ANKRUM_FAMILY_IMAGE}
              style={[
                styles.familyImage,
                {
                  height: familyImageHeight,
                  width: isTablet ? "48%" : "100%",
                },
              ]}
              resizeMode="cover"
            />

            <View style={[styles.testimonialTextContainer, { width: isTablet ? "48%" : "100%" }]}>
              <Text style={styles.testimonialHeading}>ANKRUM FAMILY</Text>

              <Text style={styles.testimonialText}>
                We stumbled upon Parents Challenge unexpectedly, but have been so
                grateful ever since. Parents Challenge sessions and financial aid
                have been a huge blessing to our homeschooling family. Due to
                Parents Challenge’s financial resources, all four of our kids have
                been able to participate in speech and debate. They’ve enjoyed
                competing and learning, and we’re so grateful for how this has given
                them a voice and taught them how to use it in a way that impacts
                their culture.
              </Text>

              <Text style={styles.testimonialText}>
                Nathaniel (’17) and his wife live and work on a university campus in
                southern California. Serena (’18) lives dually in Colorado and
                Cambodia where she works at a children’s home. Sofia (’22) is
                involved in speech during her last year of high school and is
                considering a career in ASL interpretation. Michael (’24) is
                attending a twice weekly homeschool program and is also participating
                in speech and debate.
              </Text>
            </View>
          </View>

          <View style={styles.standardsSection}>
            <Text style={styles.majorSectionHeading}>STANDARDS OF EXCELLENCE</Text>

            <Image
              source={STANDARDS_OF_EXCELLENCE_IMAGE}
              style={[styles.standardsImage, { height: standardsImageHeight }]}
              resizeMode="contain"
            />
          </View>
        </View>
      </ScrollView>
    </>
  );
}

const COLORS = {
  background: "#F4F5F2",
  card: "#F7F8F5",
  navy: "#34415D",
  mutedNavy: "#5C6780",
  sage: "#DDE4DE",
  border: "#C9D4CC",
  white: "#FFFFFF",
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  scrollContent: {
    paddingVertical: 12,
    paddingBottom: 32,
    alignItems: "center",
  },
  pageContainer: {
    alignSelf: "center",
  },
  heroImage: {
    width: "100%",
    borderRadius: 10,
    overflow: "hidden",
    marginBottom: 16,
  },

  introFrame: {
    borderWidth: 3,
    borderColor: COLORS.border,
    backgroundColor: COLORS.background,
    paddingHorizontal: 18,
    paddingTop: 22,
    paddingBottom: 26,
    marginBottom: 24,
  },
  sectionTitleRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 22,
  },
  sectionLine: {
    flex: 1,
    height: 2,
    backgroundColor: COLORS.border,
  },
  sectionLineSpacer: {
    flex: 1,
  },
  sectionTitleText: {
    marginHorizontal: 14,
    textAlign: "center",
  },
  sectionTitlePrefix: {
    fontSize: 22,
    fontWeight: "800",
    letterSpacing: 2,
    color: COLORS.navy,
  },
  sectionTitleAccent: {
    fontSize: 28,
    fontStyle: "italic",
    color: COLORS.navy,
  },
  programDescription: {
    color: COLORS.navy,
    fontSize: 17,
    lineHeight: 31,
    textAlign: "center",
    marginBottom: 22,
  },
  badgeImage: {
    alignSelf: "center",
    marginBottom: 18,
  },
  analysisButtons: {
    alignItems: "center",
  },

  linkButton: {
    width: "100%",
    maxWidth: 420,
    borderWidth: 3,
    borderColor: COLORS.border,
    backgroundColor: COLORS.white,
    paddingVertical: 16,
    paddingHorizontal: 18,
    marginBottom: 14,
  },
  linkButtonSecondary: {
    backgroundColor: COLORS.navy,
    borderColor: COLORS.navy,
  },
  linkButtonPressed: {
    opacity: 0.85,
  },
  linkButtonText: {
    textAlign: "center",
    color: COLORS.navy,
    fontSize: 16,
    fontWeight: "800",
    letterSpacing: 1.2,
  },
  linkButtonTextSecondary: {
    color: COLORS.white,
  },

  bannerSection: {
    backgroundColor: COLORS.sage,
    paddingVertical: 24,
    paddingHorizontal: 18,
    marginBottom: 18,
    borderRadius: 8,
  },
  bannerSectionText: {
    textAlign: "center",
    color: COLORS.navy,
    fontSize: 18,
    fontWeight: "800",
    lineHeight: 30,
    letterSpacing: 1.1,
  },

  activitiesGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginBottom: 24,
  },
  activityCard: {
    backgroundColor: COLORS.card,
    borderRadius: 14,
    borderWidth: 1.5,
    borderColor: COLORS.border,
    paddingHorizontal: 18,
    paddingVertical: 22,
    marginBottom: 16,
  },
  activityCardFull: {
    width: "100%",
  },
  activityCardHalf: {
    width: "48.5%",
  },
  activityIcon: {
    width: 86,
    height: 86,
    alignSelf: "center",
    marginBottom: 16,
  },
  activityTitle: {
    color: COLORS.navy,
    textAlign: "center",
    fontSize: 18,
    fontWeight: "800",
    letterSpacing: 2,
    marginBottom: 14,
  },
  activityText: {
    color: COLORS.navy,
    fontSize: 16,
    lineHeight: 30,
  },

  financialAidSection: {
    marginBottom: 24,
  },
  majorSectionHeading: {
    color: COLORS.navy,
    textAlign: "center",
    fontSize: 22,
    fontWeight: "800",
    letterSpacing: 1.6,
    marginBottom: 18,
  },
  financialAidTopRow: {
    justifyContent: "space-between",
    marginBottom: 16,
  },
  halfCard: {
    width: "48.5%",
  },
  infoCard: {
    backgroundColor: COLORS.card,
    borderRadius: 14,
    borderWidth: 1.5,
    borderColor: COLORS.border,
    paddingHorizontal: 18,
    paddingVertical: 20,
    marginBottom: 14,
  },
  criteriaCard: {
    marginRight: 0,
  },
  infoCardTitle: {
    color: COLORS.navy,
    fontSize: 19,
    fontWeight: "800",
    marginBottom: 14,
    textAlign: "center",
  },
  criteriaLine: {
    color: COLORS.navy,
    fontSize: 16,
    lineHeight: 28,
  },
  criteriaNote: {
    color: COLORS.mutedNavy,
    fontSize: 15,
    lineHeight: 24,
    marginTop: 10,
    marginBottom: 10,
    fontStyle: "italic",
  },
  infoParagraph: {
    color: COLORS.navy,
    fontSize: 16,
    lineHeight: 28,
    marginTop: 6,
  },

  choiceCard: {
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 14,
    marginBottom: 12,
    backgroundColor: COLORS.white,
  },
  choiceTitle: {
    color: COLORS.navy,
    fontSize: 16,
    fontWeight: "800",
    lineHeight: 24,
    marginBottom: 8,
  },
  choiceText: {
    color: COLORS.navy,
    fontSize: 15,
    lineHeight: 26,
  },

  applicationCard: {
    backgroundColor: COLORS.sage,
    borderRadius: 14,
    paddingHorizontal: 18,
    paddingVertical: 20,
    alignItems: "center",
  },
  applicationText: {
    color: COLORS.navy,
    textAlign: "center",
    fontSize: 16,
    lineHeight: 28,
    marginBottom: 14,
  },

  testimonialSection: {
    backgroundColor: COLORS.sage,
    borderRadius: 14,
    paddingHorizontal: 18,
    paddingVertical: 18,
    justifyContent: "space-between",
    marginBottom: 24,
  },
  familyImage: {
    borderRadius: 8,
    marginBottom: 16,
  },
  testimonialTextContainer: {
    justifyContent: "center",
  },
  testimonialHeading: {
    color: COLORS.navy,
    textAlign: "center",
    fontSize: 22,
    fontWeight: "800",
    letterSpacing: 1.6,
    marginBottom: 18,
  },
  testimonialText: {
    color: COLORS.navy,
    fontSize: 16,
    lineHeight: 31,
    marginBottom: 16,
  },

  standardsSection: {
    marginBottom: 10,
  },
  standardsImage: {
    width: "100%",
  },
});