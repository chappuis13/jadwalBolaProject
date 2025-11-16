import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ActivityIndicator, 
  SafeAreaView, 
  Image, 
  ScrollView,
  RefreshControl
} from 'react-native';
import { getLeagueInfo } from '../services/api';
import { Card, Title, Paragraph } from 'react-native-paper';
import { format } from 'date-fns';
import { COLORS, FONTS, SIZES } from '../constants/theme';

const InfoScreen = ({ route }) => {
  const { leagueCode } = route.params;
  const [info, setInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchInfo = async () => {
    try {
      const response = await getLeagueInfo(leagueCode);
      setInfo(response.data);
    } catch (error) {
      console.error("Error fetching league info:", error);
    }
  };

  useEffect(() => {
    setLoading(true);
    fetchInfo().finally(() => setLoading(false));
  }, [leagueCode]);

  const onRefresh = React.useCallback(async () => {
    setRefreshing(true);
    await fetchInfo();
    setRefreshing(false);
  }, [leagueCode]);

  if (loading || !info) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color={COLORS.primary} />
      </View>
    );
  }

  const startDate = format(new Date(info.currentSeason.startDate), 'd MMM yyyy');
  const endDate = format(new Date(info.currentSeason.endDate), 'd MMM yyyy');

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView 
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={[COLORS.primary]}
          />
        }
      >
        <Card style={styles.card}>
          <Card.Content>
            <Image source={{ uri: info.emblem }} style={styles.emblem} />
            <Title style={styles.title}>{info.name}</Title>
            
            <View style={styles.infoRow}>
              <Paragraph style={styles.label}>Negara:</Paragraph>
              <Paragraph style={styles.value}>{info.area.name}</Paragraph>
            </View>
            <View style={styles.infoRow}>
              <Paragraph style={styles.label}>Musim:</Paragraph>
              <Paragraph style={styles.value}>{startDate} - {endDate}</Paragraph>
            </View>
            <View style={styles.infoRow}>
              <Paragraph style={styles.label}>Pekan Saat Ini:</Paragraph>
              <Paragraph style={styles.value}>{info.currentSeason.currentMatchday}</Paragraph>
            </View>
          </Card.Content>
        </Card>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.secondary,
  },
  scrollView: {
    padding: 16,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.secondary,
  },
  card: {
    elevation: 1,
    borderRadius: SIZES.roundness,
    backgroundColor: COLORS.card,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  emblem: {
    width: 100,
    height: 100,
    alignSelf: 'center',
    marginVertical: 20,
    resizeMode: 'contain',
  },
  title: {
    ...FONTS.h2,
    color: COLORS.text,
    textAlign: 'center',
    marginBottom: 24,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderColor: COLORS.border,
  },
  label: {
    ...FONTS.body3,
    color: COLORS.subtext,
  },
  value: {
    ...FONTS.body3,
    color: COLORS.text,
    fontWeight: 'bold',
  }
});

export default InfoScreen;