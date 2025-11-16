import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import ProfileScreen from '../screens/ProfileScreen';
import SettingScreen from '../screens/SettingScreen';
import { COLORS } from '../constants/theme';

const Stack = createStackNavigator();

const AkunStackNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="Profile"
      screenOptions={{
        headerStyle: { backgroundColor: COLORS.primary },
        headerTintColor: '#fff',
        headerTitleStyle: { fontWeight: 'bold' },
      }}
    >
      <Stack.Screen 
        name="Profile" 
        component={ProfileScreen}
        options={{ title: 'Akun Saya' }}
      />
      <Stack.Screen 
        name="Setting" 
        component={SettingScreen}
        options={{ title: 'Pengaturan' }}
      />
    </Stack.Navigator>
  );
};

export default AkunStackNavigator;