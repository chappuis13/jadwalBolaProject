// src/screens/DetailScreen.js
import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, Image } from 'react-native';
import { Button, Card, Title, Paragraph } from 'react-native-paper';
import { format } from 'date-fns'; // Kita butuh ini juga

const DetailScreen = ({ route, navigation }) => {
  // Menerima data asli dari PertandinganScreen
  const { match } = route.params;

  // --- PERUBAHAN KUNCI ---
  // Kita sesuaikan dengan data API asli
  const homeTeam = match.homeTeam.name;
  const awayTeam = match.awayTeam.name;
  const league = match.competition.name;
  const matchTime = format(new Date(match.utcDate), 'HH:mm');
  const matchDate = format(new Date(match.utcDate), 'd MMMM yyyy');

  return (
    <SafeAreaView style={styles.container}>
      <Card style={styles.card}>
        <Card.Content style={{alignItems: 'center'}}>
          <Title style={styles.leagueTitle}>{league}</Title>
          
          <View style={styles.vsContainer}>
            {/* Tampilkan logo jika ada */}
            <View style={styles.teamDetail}>
              <Image source={{ uri: match.homeTeam.crest }} style={styles.logo} />
              <Text style={styles.teamBig}>{homeTeam}</Text>
            </View>
            
            <Text style={styles.vsText}>VS</Text>
            
            <View style={styles.teamDetail}>
              <Image source={{ uri: match.awayTeam.crest }} style={styles.logo} />
              <Text style={styles.teamBig}>{awayTeam}</Text>
            </View>
          </View>
          
          <Paragraph style={styles.dateText}>{matchDate} • {matchTime}</Paragraph>
        </Card.Content>
      </Card>

      <Button 
        mode="contained" 
        icon="arrow-left"
        color="#09AB54"
        style={styles.button}
        onPress={() => navigation.goBack()}
      >
        Kembali
      </Button>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8f9fa', padding: 20 },
  card: { elevation: 4, borderRadius: 15, paddingVertical: 20, backgroundColor: 'white' },
  leagueTitle: { color: '#09AB54', fontWeight: 'bold' },
  vsContainer: { marginVertical: 20, alignItems: 'center' },
  teamDetail: { alignItems: 'center', marginVertical: 10 },
  logo: { width: 50, height: 50, marginBottom: 10 },
  teamBig: { fontSize: 20, fontWeight: 'bold', color: '#1e293b', textAlign: 'center' },
  vsText: { fontSize: 18, color: 'grey', marginVertical: 5, fontWeight: 'bold' },
  dateText: { fontSize: 16, color: '#64748b' },
  button: { marginTop: 30, backgroundColor: '#09AB54' }
});

export default DetailScreen;