import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'; 
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import HomeStackNavigator from './HomeStackNavigator'; 
import FavoritScreen from '../screens/FavoritScreen';
import NotifikasiScreen from '../screens/NotifikasiScreen';
import AkunScreen from '../screens/AkunScreen';
import { COLORS } from '../constants/theme'; 

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: COLORS.primary },
        headerTintColor: '#fff', 
        headerTitleStyle: { fontWeight: 'bold' },
        tabBarActiveTintColor: COLORS.primary,
        tabBarInactiveTintColor: 'grey',
        tabBarStyle: { backgroundColor: COLORS.card },
      }}
    >
      <Tab.Screen
        name="HomeStack"
        component={HomeStackNavigator} 
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color, size }) => (
            <Icon name="home" color={color} size={size} />
          ),
          headerShown: false, 
        }}
      />
      <Tab.Screen
        name="Favorit"
        component={FavoritScreen}
        options={{
          tabBarLabel: 'Favorit',
          tabBarIcon: ({ color, size }) => (
            <Icon name="star" color={color} size={size} />
          ),
          title: 'Favorit Saya',
          headerShown: true,
        }}
      />
      <Tab.Screen
        name="Notifikasi"
        component={NotifikasiScreen}
        options={{
          tabBarLabel: 'Notifikasi',
          tabBarIcon: ({ color, size }) => (
            <Icon name="bell" color={color} size={size} />
          ),
          title: 'Notifikasi',
          headerShown: true,
        }}
      />
      <Tab.Screen
        name="Akun"
        component={AkunScreen}
        options={{
          tabBarLabel: 'Akun',
          tabBarIcon: ({ color, size }) => (
            <Icon name="account" color={color} size={size} />
          ),
          title: 'Akun Saya',
          headerShown: true,
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;