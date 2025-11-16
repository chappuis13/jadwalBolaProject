import React, { useEffect } from 'react';
import { View, StyleSheet, ActivityIndicator, Image, Text } from 'react-native';
import { COLORS, FONTS } from '../constants/theme';

const SplashScreen = ({ navigation }) => {

  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace('MainApp');
    }, 5000); 

    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Image 
        source={require('../assets/images/logo/app_logo.png')} 
        style={styles.logo} 
        resizeMode="contain" 
      />
      
      <Text style={styles.projectText}>Project Mobile Programming</Text>
      <Text style={styles.developerText}>Develop by_Chappuis</Text>

      <ActivityIndicator 
        size="large" 
        color={COLORS.primary} 
        style={styles.spinner}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.card, 
  },
  logo: {
    width: 200, 
    height: 200, 
    shadowColor: COLORS.primary,
    shadowOffset: {
        width: 0,
        height: 8, 
    },
    shadowOpacity: 0.4, 
    shadowRadius: 10,
    elevation: 15, 
    marginBottom: 30, 
  },
  projectText: {
    ...FONTS.h3, 
    color: COLORS.text, 
    marginBottom: 5,
  },
  developerText: {
    ...FONTS.body3, 
    color: COLORS.subtext, 
    marginBottom: 50, 
  },
  spinner: {
    position: 'absolute',
    bottom: 50,
  }
});

export default SplashScreen;