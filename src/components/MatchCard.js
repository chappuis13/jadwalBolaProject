import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Card, Avatar } from 'react-native-paper';
import { format } from 'date-fns';
import { COLORS, FONTS, SIZES } from '../constants/theme';

const MatchCard = ({ matchData, onPress }) => {
  const homeTeam = matchData.homeTeam.name;
  const awayTeam = matchData.awayTeam.name;
  const homeCrest = matchData.homeTeam.crest;
  const awayCrest = matchData.awayTeam.crest;
  const league = matchData.competition.name;
  const matchTime = format(new Date(matchData.utcDate), 'HH:mm');
  const matchDate = format(new Date(matchData.utcDate), 'd MMM yyyy');

  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.8}>
      <Card style={styles.card}>
        <Card.Content style={styles.content}>
          
          <View style={styles.teamContainer}>
            <Avatar.Image 
              size={40} 
              source={{ uri: homeCrest }} 
              style={styles.avatar}
            />
            <Text style={styles.teamName}>{homeTeam}</Text>
          </View>

          <View style={styles.infoContainer}>
            <Text style={styles.league}>{league}</Text>
            <Text style={styles.timeText}>{matchTime}</Text>
            <Text style={styles.dateText}>{matchDate}</Text>
          </View>

          <View style={styles.teamContainer}>
            <Avatar.Image 
              size={40} 
              source={{ uri: awayCrest }} 
              style={styles.avatar}
            />
            <Text style={styles.teamName}>{awayTeam}</Text>
          </View>

        </Card.Content>
      </Card>
    </TouchableOpacity>
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
  content: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 10,
  },
  teamContainer: {
    alignItems: 'center',
    width: '32%', 
    minHeight: 60,
  },
  avatar: {
    backgroundColor: 'transparent',
  },
  teamName: {
    ...FONTS.body4,
    color: COLORS.text,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 8,
  },
  infoContainer: {
    width: '36%',
    alignItems: 'center',
  },
  league: {
    ...FONTS.body5,
    color: COLORS.subtext,
    textTransform: 'uppercase',
    marginBottom: 4,
  },
  timeText: {
    ...FONTS.h3,
    color: COLORS.text,
    fontWeight: 'bold',
  },
  dateText: {
    ...FONTS.body4,
    color: COLORS.subtext,
    marginTop: 4,
  }
});

export default MatchCard;