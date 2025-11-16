import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import PertandinganScreen from '../screens/PertandinganScreen';
import KlasemenScreen from '../screens/KlasemenScreen';
import StatistikScreen from '../screens/StatistikScreen';
import InfoScreen from '../screens/InfoScreen';
import TimScreen from '../screens/TimScreen';
import { COLORS, FONTS } from '../constants/theme';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const Tab = createMaterialTopTabNavigator();

const LigaTabsNavigator = ({ route }) => {
  const { leagueCode } = route.params;

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarStyle: {
          backgroundColor: COLORS.card,
          borderBottomWidth: 1,
          borderColor: COLORS.border,
          elevation: 1, 
          height: 60,
        },
        tabBarActiveTintColor: COLORS.primary, 
        tabBarInactiveTintColor: COLORS.subtext,
        tabBarIndicatorStyle: { 
          backgroundColor: COLORS.primary,
          height: 3, 
        },
        tabBarShowIcon: true,
        tabBarShowLabel: true,
        tabBarItemStyle: {
          justifyContent: 'center',
          padding: 0,
          margin: 0,
        },
        tabBarLabelStyle: {
          fontSize: 10,
          textTransform: 'none',
          margin: 0,
          padding: 0,
        },
        tabBarIconStyle: {
          margin: 0,
          padding: 0,
          height: 24,
          justifyContent: 'center',
          marginTop: 4,
        },
        tabBarIcon: ({ color }) => {
          let iconName;

          if (route.name === 'Info Liga') {
            iconName = 'information-outline';
          } else if (route.name === 'Pertandingan') {
            iconName = 'soccer-field';
          } else if (route.name === 'Klasemen') {
            iconName = 'trophy-outline';
          } else if (route.name === 'Statistik') {
            iconName = 'chart-bar';
          } else if (route.name === 'Tim') {
            iconName = 'shield-outline';
          }

          return <Icon name={iconName} color={color} size={24} />;
        },
      })}
    >
      <Tab.Screen
        name="Info Liga"
        component={InfoScreen}
        initialParams={{ leagueCode: leagueCode }}
      />
      <Tab.Screen
        name="Pertandingan"
        component={PertandinganScreen}
        initialParams={{ leagueCode: leagueCode }}
      />
      <Tab.Screen
        name="Klasemen"
        component={KlasemenScreen}
        initialParams={{ leagueCode: leagueCode }}
      />
      <Tab.Screen
        name="Statistik"
        component={StatistikScreen}
        initialParams={{ leagueCode: leagueCode }}
      />
      <Tab.Screen
        name="Tim"
        component={TimScreen}
        initialParams={{ leagueCode: leagueCode }}
      />
    </Tab.Navigator>
  );
};

export default LigaTabsNavigator;