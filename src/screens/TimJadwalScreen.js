import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, SafeAreaView, FlatList, Alert } from 'react-native';
import { getTeamMatches } from '../services/api'; 
import MatchCard from '../components/MatchCard';
import MatchResultCard from '../components/MatchResultCard';
import { COLORS, FONTS } from '../constants/theme';

const TimJadwalScreen = ({ route }) => {
  const { teamId } = route.params; 
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMatches = async () => {
      setLoading(true);
      try {
        const response = await getTeamMatches(teamId);
        setMatches(response.data.matches || []); 
      } catch (error) {
        console.error("Error fetching team matches:", error);
        Alert.alert("Error", "Gagal mengambil data jadwal tim.");
      } finally {
        setLoading(false);
      }
    };
    fetchMatches();
  }, [teamId]);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color={COLORS.primary} />
      </View>
    );
  }

  const renderItem = ({ item }) => {
    if (item.status === 'FINISHED') {
      return <MatchResultCard match={item} />;
    }
    return (
      <MatchCard 
        matchData={item} 
        onPress={() => {}}
      />
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={matches}
        keyExtractor={(item) => item.id.toString()} 
        renderItem={renderItem}
        contentContainerStyle={{ padding: 20 }}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.center}>
            <Text style={styles.emptyText}>Tidak ada jadwal untuk tim ini.</Text>
          </View>
        }
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: COLORS.background
  }, 
  center: { 
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center',
    padding: 20,
    backgroundColor: COLORS.background,
  },
  emptyText: {
    ...FONTS.body3,
    color: COLORS.subtext,
  }
});

export default TimJadwalScreen;