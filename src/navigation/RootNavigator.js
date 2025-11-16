import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SplashScreen from '../screens/SplashScreen';
import BottomTabNavigator from './BottomTabNavigator';
import TimJadwalScreen from '../screens/TimJadwalScreen';
import { COLORS } from '../constants/theme';

const Stack = createStackNavigator();

const RootNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator 
        initialRouteName="Splash" 
      >
        <Stack.Screen 
          name="Splash" 
          component={SplashScreen} 
          options={{ headerShown: false }}
        />
        <Stack.Screen 
          name="MainApp" 
          component={BottomTabNavigator} 
          options={{ headerShown: false }}
        />
        <Stack.Screen 
          name="TimJadwal" 
          component={TimJadwalScreen}
          options={({ route }) => ({ 
            title: route.params.teamName || 'Jadwal Tim',
            headerShown: true,
            headerStyle: { backgroundColor: COLORS.primary },
            headerTintColor: '#fff',
            headerTitleStyle: { fontWeight: 'bold' },
          })} 
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigator;