import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, FlatList, Image } from 'react-native';
import { Title, List, Divider } from 'react-native-paper';
import { useAuth } from '../context/AuthContext';
import { COLORS, FONTS } from '../constants/theme';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const FavoritScreen = ({ navigation }) => {
  const { favorites, isLoggedIn } = useAuth();

  const renderItem = ({ item }) => {
    const team = item.team_data;

    return (
      <View>
        <List.Item
          title={team.name}
          titleStyle={styles.titleName}
          description={`Stadion: ${team.venue || 'N/A'}`}
          descriptionStyle={styles.descriptionText}
          left={() => (
            <Image 
              source={{ uri: team.crest }} 
              style={styles.logo} 
            />
          )}
          right={(props) => (
            <Icon 
              {...props} 
              name="chevron-right" 
              size={28} 
              color={COLORS.subtext} 
              style={styles.chevron}
            />
          )}
          onPress={() => navigation.navigate('TimJadwal', {
            teamId: team.id,
            teamName: team.name
          })}
        />
        <Divider style={styles.divider} />
      </View>
    );
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
          "Silakan login di tab Akun untuk melihat favorit."
        )}
      </SafeAreaView>
    );
  }

  if (favorites.length === 0) {
    return (
      <SafeAreaView style={styles.container}>
        {renderEmptyState(
          "star-off-outline", 
          "Belum Ada Favorit", 
          "Anda bisa menambah tim favorit di tab 'Tim' di dalam menu Home."
        )}
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={favorites}
        keyExtractor={(item) => item.team_id.toString()}
        renderItem={renderItem}
      />
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
  chevron: {
    alignSelf: 'center',
    marginRight: 8,
  },
  divider: {
    backgroundColor: COLORS.border,
  }
});

export default FavoritScreen;