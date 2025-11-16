import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  FlatList, 
  StyleSheet, 
  ActivityIndicator, 
  SafeAreaView, 
  Alert,
  RefreshControl
} from 'react-native';
import { getMatches } from '../services/api'; 
import MatchCard from '../components/MatchCard';
import { COLORS } from '../constants/theme';

const PertandinganScreen = ({ navigation, route }) => {
  const { leagueCode } = route.params; 
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchMatches = async () => {
    try {
      const response = await getMatches(leagueCode);
      setMatches(response.data.matches); 
    } catch (error) {
      console.error("Error fetching matches:", error);
      Alert.alert("Error", "Gagal mengambil data jadwal.");
    }
  };

  useEffect(() => {
    setLoading(true);
    fetchMatches().finally(() => setLoading(false));
  }, [leagueCode]);

  const onRefresh = React.useCallback(async () => {
    setRefreshing(true);
    await fetchMatches();
    setRefreshing(false);
  }, [leagueCode]);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color={COLORS.primary} />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={matches}
        keyExtractor={(item) => item.id.toString()} 
        renderItem={({ item }) => (
          <MatchCard 
            matchData={item} 
            onPress={() => navigation.navigate('Detail', { match: item })} 
          />
        )}
        contentContainerStyle={{ padding: 20 }}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={[COLORS.primary]}
          />
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
    backgroundColor: COLORS.background,
  }
});

export default PertandinganScreen;