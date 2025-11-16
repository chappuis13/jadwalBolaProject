import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ActivityIndicator, 
  SafeAreaView, 
  ScrollView, 
  Alert, 
  Image,
  RefreshControl
} from 'react-native';
import { getTopScorers } from '../services/api';
import { List, Avatar, Divider, Caption, Title } from 'react-native-paper';
import { COLORS, FONTS } from '../constants/theme';

const StatistikScreen = ({ route }) => {
  const { leagueCode } = route.params;
  const [scorers, setScorers] = useState([]);
  const [assists, setAssists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchStats = async () => {
    try {
      const response = await getTopScorers(leagueCode);
      const data = response.data.scorers;
      
      if (data) {
        setScorers(data);
        const sortedByAssists = [...data].sort((a, b) => (b.assists || 0) - (a.assists || 0));
        setAssists(sortedByAssists);
      } else {
        setScorers([]);
        setAssists([]);
      }
    } catch (error) {
      console.error("Error fetching stats:", error);
      Alert.alert("Error", "Gagal mengambil data statistik.");
    }
  };

  useEffect(() => {
    setLoading(true);
    fetchStats().finally(() => setLoading(false));
  }, [leagueCode]);

  const onRefresh = React.useCallback(async () => {
    setRefreshing(true);
    await fetchStats();
    setRefreshing(false);
  }, [leagueCode]);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color={COLORS.primary} />
      </View>
    );
  }

  const renderStatItem = (item, index, type) => {
      const statCount = type === 'goals' ? item.goals : item.assists;
      const statLabel = type === 'goals' ? 'Gol' : 'Assist';
      
      return (
        <View key={`${type}-${item.player.id}`}>
          <List.Item
            title={item.player.name}
            titleStyle={styles.titleName}
            description={
              <View style={styles.descriptionContainer}>
                <Image source={{ uri: item.team.crest }} style={styles.teamLogo} />
                <Text style={styles.descriptionText}>
                  {item.team.name} ({item.player.nationality} / {item.player.position || 'N/A'})
                </Text>
              </View>
            }
            right={() => (
                <View style={styles.statContainer}>
                    <Text style={styles.statText}>{statCount || 0}</Text>
                    <Caption style={styles.statLabel}>{statLabel}</Caption>
                </View>
            )}
            left={() => <Avatar.Text size={40} label={`${index + 1}`} style={styles.ranking} />}
          />
          <Divider style={styles.divider} />
        </View>
      );
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
        {scorers.length === 0 ? (
          <View style={styles.centerEmpty}>
            <Text style={styles.emptyText}>Data statistik tidak ditemukan.</Text>
          </View>
        ) : (
          <View>
            <Title style={styles.title}>Top Scorer</Title>
            {scorers.map((item, index) => renderStatItem(item, index, 'goals'))}

            <Title style={styles.title}>Top Assist</Title>
            {assists.map((item, index) => renderStatItem(item, index, 'assists'))}
            
            <View style={{ height: 20 }} /> 
          </View>
        )}
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
    backgroundColor: COLORS.background,
  },
  centerEmpty: {
    padding: 20,
    marginTop: 20,
    alignItems: 'center',
  },
  emptyText: {
    ...FONTS.body3,
    color: COLORS.subtext,
  },
  title: {
      ...FONTS.h3,
      paddingHorizontal: 16,
      paddingTop: 20,
      paddingBottom: 10,
      backgroundColor: COLORS.secondary,
      color: COLORS.text,
      borderBottomWidth: 1,
      borderColor: COLORS.border,
  },
  statContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 15,
  },
  statText: {
    ...FONTS.h3,
    color: COLORS.primary,
    fontWeight: 'bold',
  },
  statLabel: {
    ...FONTS.body5,
  },
  ranking: {
    backgroundColor: COLORS.secondary,
    marginLeft: 10,
  },
  titleName: {
    ...FONTS.body2,
    color: COLORS.text,
    fontWeight: 'bold',
  },
  descriptionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  teamLogo: {
    width: 16,
    height: 16,
    resizeMode: 'contain',
    marginRight: 6,
  },
  descriptionText: {
    ...FONTS.body4,
    color: COLORS.subtext,
    flexShrink: 1,
  },
  divider: {
    backgroundColor: COLORS.border,
  }
});

export default StatistikScreen;