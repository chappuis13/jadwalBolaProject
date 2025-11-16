import React from 'react';
import { ImageBackground, StyleSheet, View } from 'react-native';

const AuthBackground = ({ children }) => {
  return (
    <ImageBackground
      source={require('../assets/images/background/auth_bg.jpg')}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.overlay}>
        {children}
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  overlay: {
    flex: 1,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default AuthBackground;