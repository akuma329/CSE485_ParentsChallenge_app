//about us page
//Last edited: 11/13/2025 
//Edited by: Sheneeza

import React, { useState } from 'react';
import { Text, StyleSheet, View } from 'react-native';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

const TextInANest = () => {
  const [titleText, setTitleText] = useState("About Us");
  const bodyText = 'Parents Challenge disrupts the legacy of educational failure by empowering parents. We provide our families with information, training, mentoring, tools, and financial resources to equip them to choose the education they think best for their children.';
  const [backButton, setBackButton] = useState(false);

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>

        <View style={styles.titleContainer}>
          <Text style={styles.titleText}>{titleText}</Text>
        </View>

        {/* Rounded rectangle for intro of about page */}
        <View style={styles.bodyContainer}>
          <Text style={styles.bodyText}>{bodyText}</Text>
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
    backgroundColor: '#489cbdff', 
    borderRadius: 5,          
    alignSelf: 'stretch',  
    padding: 20,       
  },

  bodyText: {
    fontSize: 16,
    textAlign: 'left', 
    color: '#ffffff',  
  },
  
});

export default TextInANest;


