import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { useAuth } from '../context/AuthContext';
import AuthStackNavigator from '../navigation/AuthStackNavigator';
import AkunStackNavigator from '../navigation/AkunStackNavigator';
import { COLORS } from '../constants/theme';

const AkunScreen = () => {
  const { session } = useAuth();

  return (
    <SafeAreaView style={styles.container}>
      {session && session.user ? (
        <AkunStackNavigator />
      ) : (
        <AuthStackNavigator />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: COLORS.card
  }
});

export default AkunScreen;