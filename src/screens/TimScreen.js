import React, { useState, useEffect } from 'react';
import { 
  View, 
  StyleSheet, 
  ActivityIndicator, 
  SafeAreaView, 
  FlatList, 
  Image, 
  Alert,
  RefreshControl
} from 'react-native';
import { getTeams } from '../services/api';
import { List, Divider, IconButton, Searchbar } from 'react-native-paper';
import { useAuth } from '../context/AuthContext';
import { COLORS, FONTS, SIZES } from '../constants/theme';

const TimScreen = ({ route, navigation }) => {
  const { leagueCode } = route.params;
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const { addFavorite, removeFavorite, isFavorite, isLoggedIn } = useAuth();

  const [searchQuery, setSearchQuery] = useState('');
  const [refreshing, setRefreshing] = useState(false);

  const fetchTeams = async () => {
    try {
      const response = await getTeams(leagueCode);
      setTeams(response.data.teams);
    } catch (error) {
      console.error("Error fetching teams:", error);
      Alert.alert("Error", "Gagal mengambil data tim.");
    }
  };

  useEffect(() => {
    setLoading(true);
    fetchTeams().finally(() => setLoading(false));
  }, [leagueCode]);

  const onRefresh = React.useCallback(async () => {
    setRefreshing(true);
    await fetchTeams();
    setRefreshing(false);
  }, [leagueCode]);

  const handleFavoritePress = (team) => {
    if (!isLoggedIn) {
      Alert.alert(
        "Login Dibutuhkan", 
        "Anda harus login di tab Akun untuk menambah favorit.",
        [{ text: "OK" }]
      );
      return;
    }
    
    if (isFavorite(team.id)) {
      removeFavorite(team.id);
    } else {
      addFavorite(team);
    }
  };

  const filteredTeams = teams.filter((team) => {
    return team.name.toLowerCase().includes(searchQuery.toLowerCase());
  });

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color={COLORS.primary} />
      </View>
    );
  }

  const renderItem = ({ item }) => {
    const isFav = isFavorite(item.id);

    return (
      <View>
        <List.Item
          title={item.name}
          titleStyle={styles.titleName}
          description={`Stadion: ${item.venue || 'N/A'}`}
          descriptionStyle={styles.descriptionText}
          left={() => (
            <Image 
              source={{ uri: item.crest }} 
              style={styles.logo} 
            />
          )}
          right={() => (
            <IconButton
              icon={isFav ? "star" : "star-outline"}
              color={isFav ? COLORS.primary : COLORS.subtext}
              size={28}
              onPress={() => handleFavoritePress(item)}
              style={styles.iconButton}
            />
          )}
          onPress={() => navigation.navigate('TimDetail', { 
            team: item 
          })}
        />
        <Divider style={styles.divider} />
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <Searchbar
        placeholder="Cari tim..."
        onChangeText={setSearchQuery}
        value={searchQuery}
        style={styles.searchbar}
        iconColor={COLORS.primary}
      />
      
      <FlatList
        data={filteredTeams}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        style={styles.listContainer}
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
  },
  searchbar: {
    margin: 16,
    borderRadius: SIZES.roundness,
    elevation: 2,
    backgroundColor: COLORS.card,
  },
  listContainer: {
    backgroundColor: COLORS.card,
  },
  logo: { 
    width: 40, 
    height: 40, 
    marginLeft: 10, 
    resizeMode: 'contain',
    alignSelf: 'center',
  },
  titleName: {
    ...FONTS.body3,
    color: COLORS.text,
    fontWeight: 'bold',
  },
  descriptionText: {
    ...FONTS.body4,
    color: COLORS.subtext,
  },
  iconButton: {
    marginRight: 8,
  },
  divider: {
    backgroundColor: COLORS.border,
  }
});

export default TimScreen;