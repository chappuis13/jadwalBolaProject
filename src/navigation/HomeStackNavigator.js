import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import LigaScreen from '../screens/LigaScreen';
import LigaTabsNavigator from './LigaTabsNavigator';
import DetailScreen from '../screens/DetailScreen';
import TimDetailScreen from '../screens/TimDetailScreen';
import PemainScreen from '../screens/PemainScreen';
import PemainDetailScreen from '../screens/PemainDetailScreen';
import { COLORS } from '../constants/theme'; 

const Stack = createStackNavigator();

const HomeStackNavigator = () => {
  return (
      <Stack.Navigator 
        initialRouteName="Liga" 
        screenOptions={{
          headerStyle: { backgroundColor: COLORS.primary }, 
          headerTintColor: '#fff',
          headerTitleStyle: { fontWeight: 'bold' },
        }}
      >
        <Stack.Screen 
          name="Liga" 
          component={LigaScreen} 
          options={{ title: 'Pilih Liga Sepakbola' }} 
        />
        <Stack.Screen 
          name="LigaTabs" 
          component={LigaTabsNavigator}
          options={({ route }) => ({ title: route.params.leagueName })} 
        />
        <Stack.Screen 
          name="Detail" 
          component={DetailScreen} 
          options={{ title: 'Detail Laga' }} 
        />
        <Stack.Screen 
          name="TimDetail" 
          component={TimDetailScreen}
          options={({ route }) => ({ title: route.params.team.name || 'Detail Tim' })} 
        />
        <Stack.Screen 
          name="Pemain" 
          component={PemainScreen}
          options={({ route }) => ({ title: route.params.teamName || 'Daftar Pemain' })} 
        />
        <Stack.Screen 
          name="PemainDetail" 
          component={PemainDetailScreen}
          options={({ route }) => ({ title: route.params.player.name || 'Detail Pemain' })} 
        />
      </Stack.Navigator>
  );
};

export default HomeStackNavigator;