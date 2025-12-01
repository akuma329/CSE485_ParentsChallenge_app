//about us page
//Last edited: 12/1/2025
//Edited by: Sheneeza

import React, { useState } from 'react';
import { Text, StyleSheet, View } from 'react-native';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

const aboutUs = () => {
  const [titleText, setTitleText] = useState("About Us");
  const [whoWeAreText, setWhoWeAreText] = useState("The Mission");
  const missionText = 'Parents Challenge disrupts the legacy of educational failure by empowering parents. We provide our families with information, training, mentoring, tools, and financial resources to equip them to choose the education they think best for their children.\n\nChoice and freedom are enshrined in virtually all aspects of American society. Why not in education, especially for low-income families, for whom education offers the greatest hope for economic advancement?';
  const [backButton, setBackButton] = useState(false);
  const [ourFoudningPrinciplesTitle, setOurFoudningPrinciplesTitle] = useState("Our Founding Principles");
  const makingADifference1 = 'Founded in 2000 by Steve & Joyce Schuck, Parents Challenge provides families with tools and resources to exercise educational choice to achieve academic success. Parents Challenge has provided educational choice to nearly 4,000 students and their families. Over two million dollars have been disbursed in scholarships and grants to ensure that choice is never limited to only those of means. As they take responsibility for their children’s education, parents have also taken more control of their own lives. Parents Challenge students have prospered, gaining the confidence and skills to succeed in life. \n\nTwenty-two years of measuring academic performance have taught us that empowered parents and guardians working through the support system of our programs have dramatically improved their lives and those of their children. Through the work of Parents Challenge, families have been transformed and they, as well as our community, are better off as a result.';

  const [standardsOfExcellenceTitle, setstandardsOfExcellenceTitle] = useState("Our Standards of Excellence");

  const standardsOfExcellence = [
  "Whole-child education that involves the parent, the child, the family dynamic, and external resources.",
  "Empowerment for parents to advocate on behalf of all children, not just their own.",
  "Supplementary education services and experimental learning support",
  "Informational and financial resources for parents to determine the best learning environment for their children.",
  "Partnerships with parents and their children, built on respect, mutual accountability, and commitment.",
  "Analysis of students progress to ensure dynamic program effecteness to better serve our families' needs."
  ];
   const ourFoudningPrinciplesBullets = [
  "All children have the right to be educated.",
  "Parents know what is best for their children.",
  "Schools must be accountable to the children and their parents.",
  "Empowering parents with “choice” means a better education for all.",
  "Parents must be engaged in the education of their children.",
  "Most importantly, we are committed to making these beliefs real and available to families in Colorado Springs and, ultimately, across the country."
  ];



  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>

        <View style={styles.titleContainer}>
          <Text style={styles.titleText}>{titleText}</Text>
        </View>

        <View style={styles.titleContainer}>
          <Text style={styles.whoWeAre}>{whoWeAreText}</Text>
        </View>

        <View style={styles.bodyContainer}>
          <Text style={styles.missionText}>{missionText}</Text>
        </View>

        <View style={styles.titleContainer}>
          <Text style={styles.whoWeAre}>{ourFoudningPrinciplesTitle}</Text>
        </View>

        {/*insert founding principles in bullets*/}

        <View style={styles.titleContainer}>
          <Text style={styles.standardsOfExcellenceTitle}>{standardsOfExcellenceTitle}</Text>
        </View>


        {standardsOfExcellence.map((item, index) => (
          <Text key={index} style={styles.standardsOfExcellence}>
              ‣ {item}
        </Text>


        
))}

        <View style={styles.bodyContainer}>
          <Text style={styles.makingADifference1}>{makingADifference1}</Text>
        </View>

      </SafeAreaView>
    </SafeAreaProvider>

  
  );
};



const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
    paddingHorizontal: 20,
    backgroundColor: '#ffffff'
  },
  titleContainer: {
    width: '100%',        
    alignItems: 'center', 
    marginBottom: 20,
  },
  titleText: {
    fontSize: 32,
    fontWeight: 'bold',
  },

  bodyContainer: {
    backgroundColor: '#48a4bdff', 
    borderRadius: 5,          
    alignSelf: 'stretch',  
    padding: 20,      
    marginBottom: 12, 
  },

  missionText: {
    fontSize: 16,
    textAlign: 'left', 
    color: '#ffffff',  
  },

  makingADifference1: {
  fontSize: 16,
  color: '#ffffff',
  textAlign: 'left',
},

standardsOfExcellenceTitle: {
    fontSize: 25,
    fontWeight: 'bold',
  },

  standardsOfExcellence: {
    fontSize: 16,
    color: '#000000ff',
    marginTop: 8,
    marginBottom: 12,
  },
  
  whoWeAre: {
    fontSize: 25,
    fontWeight: 'bold',
  },
});

export default aboutUs;
