import React from 'react';
import { StyleSheet, SafeAreaView, ScrollView, View, Image, useWindowDimensions } from 'react-native';
import { Card, Title } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { LEAGUE_CODES } from '../services/api';
import { COLORS, FONTS, SIZES } from '../constants/theme';

const leagues = [
  {
    name: 'Liga Utama Inggris',
    code: LEAGUE_CODES.LIGA_INGGRIS,
    emblem: { uri: 'https://crests.football-data.org/PL.png' }
  },
  {
    name: 'La Liga Spanyol',
    code: LEAGUE_CODES.LA_LIGA,
    emblem: require('../assets/images/logo_laliga.png')
  },
  {
    name: 'Serie A Italia',
    code: LEAGUE_CODES.SERIE_A,
    emblem: { uri: 'https://crests.football-data.org/SA.png' }
  },
  {
    name: 'Bundesliga Jerman',
    code: LEAGUE_CODES.BUNDESLIGA,
    emblem: { uri: 'https://crests.football-data.org/BL1.png' }
  },
  {
    name: 'Ligue 1 Prancis',
    code: LEAGUE_CODES.LIGUE_1,
    emblem: { uri: 'https://crests.football-data.org/FL1.png' }
  }
];

const BREAKPOINTS = {
  tablet: 600,
  largeTablet: 1024,
};

const LigaScreen = ({ navigation }) => {
  const { width } = useWindowDimensions();

  let numColumns = 1;
  if (width >= BREAKPOINTS.largeTablet) {
    numColumns = 3; 
  } else if (width >= BREAKPOINTS.tablet) {
    numColumns = 2; 
  }

  const cardWidth = (width - 40 - ((numColumns - 1) * 15)) / numColumns;
  
  const goToLeague = (leagueCode, leagueName) => {
    navigation.navigate('LigaTabs', {
      leagueCode: leagueCode,
      leagueName: leagueName,
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} contentContainerStyle={{ paddingBottom: 40 }}>
        <View style={styles.content}>
          <Title style={styles.title}>Pilih Liga</Title>
          
          <View style={styles.gridContainer}>
            {leagues.map((liga) => (
              <Card 
                key={liga.code} 
                style={[styles.card, { width: cardWidth }]} 
                onPress={() => goToLeague(liga.code, liga.name)}
              >
                <Card.Title
                  title={liga.name}
                  titleStyle={styles.cardTitle}
                  left={() => (
                    <View style={styles.logoContainer}>
                      <Image 
                        source={liga.emblem} 
                        style={styles.logo}
                        resizeMode="contain"
                      />
                    </View>
                  )}
                  right={(props) => (
                    <Icon 
                      {...props} 
                      name="chevron-right" 
                      size={28} 
                      color={COLORS.subtext} 
                      style={styles.chevron}
                    />
                  )}
                />
              </Card>
            ))}
          </View>
          
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background, 
  },
  scrollView: {
    flex: 1,
  },
  content: {
    padding: 20,
  },
  title: {
    ...FONTS.h2, 
    color: COLORS.text,
    textAlign: 'center',
    marginBottom: 30,
    marginTop: 10,
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 15,
  },
  card: {
    backgroundColor: COLORS.card, 
    marginBottom: 15,
    elevation: 2, 
    borderWidth: 1, 
    borderColor: COLORS.border, 
    borderRadius: SIZES.roundness, 
  },
  cardTitle: {
    ...FONTS.body2,
    fontWeight: 'bold',
    color: COLORS.text,
    fontSize: 16, 
  },
  logoContainer: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 0, 
    backgroundColor: 'transparent',
  },
  logo: {
    width: '100%',
    height: '100%',
  },
  chevron: {
    marginRight: 8,
  }
});

export default LigaScreen;