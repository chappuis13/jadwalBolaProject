import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { Card, Paragraph } from 'react-native-paper';
import { format } from 'date-fns';
import { COLORS, FONTS, SIZES } from '../constants/theme';

const MatchResultCard = ({ match }) => {
  const homeTeam = match.homeTeam;
  const awayTeam = match.awayTeam;
  const score = match.score.fullTime;
  
  const homeWon = score.home > score.away;
  const awayWon = score.away > score.home;

  const matchDate = format(new Date(match.utcDate), 'd MMM yyyy');

  return (
    <Card style={styles.card}>
      <Card.Content>
        <Paragraph style={styles.date}>{matchDate} - {match.competition.name}</Paragraph>
        <View style={styles.content}>
          
          <View style={styles.teamContainer}>
            <Image source={{ uri: homeTeam.crest }} style={styles.logo} />
            <Text 
              style={[
                styles.teamName, 
                homeWon && styles.winnerText
              ]}
              numberOfLines={2}
            >
              {homeTeam.name}
            </Text>
          </View>
          
          <View style={styles.scoreContainer}>
            <Text 
              style={[
                styles.score, 
                homeWon && styles.winnerText
              ]}
            >
              {score.home}
            </Text>
            <Text style={styles.separator}>-</Text>
            <Text 
              style={[
                styles.score, 
                awayWon && styles.winnerText
              ]}
            >
              {score.away}
            </Text>
          </View>

          <View style={styles.teamContainer}>
            <Image source={{ uri: awayTeam.crest }} style={styles.logo} />
            <Text 
              style={[
                styles.teamName, 
                awayWon && styles.winnerText
              ]}
              numberOfLines={2}
            >
              {awayTeam.name}
            </Text>
          </View>
        </View>
      </Card.Content>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.card,
    marginBottom: 15,
    elevation: 2,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: SIZES.roundness,
  },
  date: {
    ...FONTS.body5,
    color: COLORS.subtext,
    textAlign: 'center',
    marginBottom: 10,
    textTransform: 'uppercase',
  },
  content: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  teamContainer: {
    width: '35%',
    alignItems: 'center',
    paddingHorizontal: 5,
    minHeight: 60,
  },
  logo: {
    width: 30,
    height: 30,
    resizeMode: 'contain',
    marginBottom: 5,
  },
  teamName: {
    ...FONTS.body4,
    fontWeight: '600',
    textAlign: 'center',
    color: COLORS.text,
  },
  scoreContainer: {
    width: '30%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  score: {
    ...FONTS.h2,
    fontWeight: 'bold',
    color: COLORS.subtext,
    marginHorizontal: 10,
  },
  separator: {
    ...FONTS.h3,
    color: COLORS.border,
  },
  winnerText: {
    color: COLORS.primary,
  }
});

export default MatchResultCard;