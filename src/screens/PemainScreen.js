import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, SafeAreaView, FlatList, Alert } from 'react-native';
import { getTeamDetails } from '../services/api';
import { List, Divider, Avatar } from 'react-native-paper';
import { COLORS, FONTS } from '../constants/theme';
import { format } from 'date-fns';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const PemainScreen = ({ route, navigation }) => {
  const { teamId } = route.params; 
  const [squad, setSquad] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSquad = async () => {
      setLoading(true);
      try {
        const response = await getTeamDetails(teamId);
        setSquad(response.data.squad || []); 
      } catch (error) {
        console.error("Error fetching squad:", error);
        Alert.alert("Error", "Gagal mengambil data skuad.");
      } finally {
        setLoading(false);
      }
    };
    fetchSquad();
  }, [teamId]);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color={COLORS.primary} />
      </View>
    );
  }

  const renderItem = ({ item }) => {
    const age = item.dateOfBirth 
      ? format(new Date(), 'yyyy') - format(new Date(item.dateOfBirth), 'yyyy')
      : 'N/A';

    return (
      <View>
        <List.Item
          title={item.name}
          titleStyle={styles.titleName}
          description={`${item.position || 'N/A'} • ${item.nationality} • ${age} thn`}
          descriptionStyle={styles.descriptionText}
          left={() => (
            <Avatar.Icon 
              size={40} 
              icon="account" 
              style={styles.avatar}
              color={COLORS.primary}
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
          onPress={() => navigation.navigate('PemainDetail', { 
            player: item 
          })}
        />
        <Divider style={styles.divider} />
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={squad}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        ListEmptyComponent={
          <View style={styles.center}>
            <Text style={styles.emptyText}>Data skuad tidak tersedia.</Text>
          </View>
        }
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
    backgroundColor: COLORS.background,
    padding: 20,
  },
  emptyText: {
    ...FONTS.body3,
    color: COLORS.subtext,
  },
  avatar: { 
    backgroundColor: COLORS.secondary,
    marginLeft: 10,
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
  divider: {
    backgroundColor: COLORS.border,
  },
  chevron: {
    alignSelf: 'center',
    marginRight: 8,
  }
});

export default PemainScreen;