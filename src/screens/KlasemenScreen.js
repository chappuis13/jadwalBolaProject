import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ActivityIndicator, 
  SafeAreaView, 
  ScrollView, 
  Image,
  RefreshControl
} from 'react-native';
import { getStandings } from '../services/api';
import { DataTable } from 'react-native-paper';
import { COLORS, FONTS } from '../constants/theme';

const KlasemenScreen = ({ route }) => {
  const { leagueCode } = route.params;
  const [standings, setStandings] = useState(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchStandings = async () => {
    try {
      const response = await getStandings(leagueCode);
      setStandings(response.data.standings[0].table);
    } catch (error) {
      console.error("Error fetching standings:", error);
    }
  };

  useEffect(() => {
    setLoading(true);
    fetchStandings().finally(() => setLoading(false));
  }, [leagueCode]);

  const onRefresh = React.useCallback(async () => {
    setRefreshing(true);
    await fetchStandings();
    setRefreshing(false);
  }, [leagueCode]);

  if (loading) {
    return <View style={styles.center}><ActivityIndicator size="large" color={COLORS.primary} /></View>;
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={[COLORS.primary]}
          />
        }
      >
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          <View>
            <DataTable>
              <DataTable.Header style={styles.header}>
                <DataTable.Title style={styles.pos}>#</DataTable.Title>
                <DataTable.Title style={styles.team}>Klub</DataTable.Title>
                <DataTable.Title numeric style={styles.numeric}>T</DataTable.Title>
                <DataTable.Title numeric style={styles.numeric}>M</DataTable.Title>
                <DataTable.Title numeric style={styles.numeric}>S</DataTable.Title>
                <DataTable.Title numeric style={styles.numeric}>K</DataTable.Title>
                <DataTable.Title numeric style={styles.numeric}>GM</DataTable.Title>
                <DataTable.Title numeric style={styles.numeric}>GK</DataTable.Title>
                <DataTable.Title numeric style={styles.numeric}>SG</DataTable.Title>
                <DataTable.Title numeric style={styles.numericBold}>Poin</DataTable.Title>
              </DataTable.Header>

              {standings && standings.map((item) => (
                <DataTable.Row key={item.team.id} style={styles.row}>
                  <DataTable.Cell style={styles.pos}>
                    <Text style={styles.posText}>{item.position}</Text>
                  </DataTable.Cell>
                  
                  <DataTable.Cell style={styles.team}>
                    <View style={styles.teamContainer}>
                      <Image source={{ uri: item.team.crest }} style={styles.logo} />
                      <Text style={styles.teamName}>{item.team.name}</Text>
                    </View>
                  </DataTable.Cell>

                  <DataTable.Cell numeric style={styles.numeric}>
                    <Text style={styles.dataText}>{item.playedGames}</Text>
                  </DataTable.Cell>
                  <DataTable.Cell numeric style={styles.numeric}>
                    <Text style={styles.dataText}>{item.won}</Text>
                  </DataTable.Cell>
                  <DataTable.Cell numeric style={styles.numeric}>
                    <Text style={styles.dataText}>{item.draw}</Text>
                  </DataTable.Cell>
                  <DataTable.Cell numeric style={styles.numeric}>
                    <Text style={styles.dataText}>{item.lost}</Text>
                  </DataTable.Cell>
                  <DataTable.Cell numeric style={styles.numeric}>
                    <Text style={styles.dataText}>{item.goalsFor}</Text>
                  </DataTable.Cell>
                  <DataTable.Cell numeric style={styles.numeric}>
                    <Text style={styles.dataText}>{item.goalsAgainst}</Text>
                  </DataTable.Cell>
                  <DataTable.Cell numeric style={styles.numeric}>
                    <Text style={styles.dataText}>{item.goalDifference}</Text>
                  </DataTable.Cell>
                  <DataTable.Cell numeric style={styles.numericBold}>
                    <Text style={styles.pointsText}>{item.points}</Text>
                  </DataTable.Cell>
                </DataTable.Row>
              ))}
            </DataTable>
          </View>
        </ScrollView>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: COLORS.card 
  },
  center: { 
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center', 
    backgroundColor: COLORS.background 
  },
  header: { 
    backgroundColor: COLORS.secondary,
    borderBottomWidth: 1, 
    borderColor: COLORS.border, 
    paddingVertical: 8, 
    minHeight: 45, 
  },
  row: { 
    borderBottomWidth: 1, 
    borderColor: COLORS.border, 
    height: 55,
  },
  pos: { 
    width: 35,
    justifyContent: 'center',
  },
  posText: {
    ...FONTS.body3,
    color: COLORS.subtext,
    textAlign: 'center',
  },
  team: { 
    width: 230,
  },
  teamContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 5,
  },
  logo: { 
    width: 24, 
    height: 24, 
    resizeMode: 'contain' 
  },
  teamName: {
    ...FONTS.body3,
    color: COLORS.text,
    fontWeight: '600',
    marginLeft: 10,
    flexShrink: 1,
  },
  numeric: { 
    width: 40, 
    justifyContent: 'center',
  },
  dataText: {
    ...FONTS.body3,
    color: COLORS.subtext,
  },
  numericBold: {
    width: 45,
    justifyContent: 'center',
  },
  pointsText: {
    ...FONTS.body3,
    color: COLORS.text,
    fontWeight: 'bold',
  }
});

export default KlasemenScreen;