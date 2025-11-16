import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, SafeAreaView, FlatList, ActivityIndicator } from 'react-native';
import { Title } from 'react-native-paper';
import { useAuth } from '../context/AuthContext';
import { getFinishedMatches, LEAGUE_CODES } from '../services/api'; 
import MatchResultCard from '../components/MatchResultCard'; 
import { COLORS, FONTS, SIZES } from '../constants/theme';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const NotifikasiScreen = () => {
  const { isLoggedIn } = useAuth();
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isLoggedIn) {
      fetchResults();
    } else {
      setMatches([]);
    }
  }, [isLoggedIn]); 

  const fetchResults = async () => {
    setLoading(true);
    try {
      const response = await getFinishedMatches(LEAGUE_CODES.LIGA_INGGRIS);
      setMatches(response.data.matches);
    } catch (error) {
      console.error("Error fetching results:", error);
    } finally {
      setLoading(false);
    }
  };

  const renderEmptyState = (icon, title, message) => (
    <View style={styles.center}>
      <Icon name={icon} size={80} color={COLORS.border} />
      <Title style={styles.emptyTitle}>{title}</Title>
      <Text style={styles.emptyText}>{message}</Text>
    </View>
  );

  if (!isLoggedIn) {
    return (
      <SafeAreaView style={styles.container}>
        {renderEmptyState(
          "login-variant", 
          "Login Dibutuhkan", 
          "Silakan login untuk melihat hasil pertandingan terbaru."
        )}
      </SafeAreaView>
    );
  }

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color={COLORS.primary} />
      </View>
    );
  }

  if (matches.length === 0) {
    return (
      <SafeAreaView style={styles.container}>
        {renderEmptyState(
          "bell-off-outline", 
          "Tidak Ada Hasil Terbaru", 
          "Hasil pertandingan terbaru akan muncul di sini."
        )}
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={matches}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <MatchResultCard match={item} />}
        contentContainerStyle={{ padding: 16 }}
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
  emptyTitle: {
    ...FONTS.h3,
    color: COLORS.text,
    marginTop: 20,
    textAlign: 'center',
  },
  emptyText: {
    ...FONTS.body3,
    color: COLORS.subtext,
    textAlign: 'center',
    marginTop: 8,
  }
});

export default NotifikasiScreen;