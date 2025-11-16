import React from 'react';
import { StatusBar } from 'react-native';
import { Provider as PaperProvider } from 'react-native-paper';
import { AuthProvider } from './src/context/AuthContext';
import { PaperTheme, COLORS } from './src/constants/theme';
import RootNavigator from './src/navigation/RootNavigator';

export default function App() {
  return (
    <AuthProvider>
      <PaperProvider theme={PaperTheme}> 
        <StatusBar backgroundColor={COLORS.primary} barStyle="light-content" />
        <RootNavigator />
      </PaperProvider>
    </AuthProvider>
  );
}