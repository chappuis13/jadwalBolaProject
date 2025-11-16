import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, Image, ScrollView, Alert, Linking } from 'react-native';
import { Card, Title, Paragraph, Button } from 'react-native-paper';
import { COLORS, FONTS, SIZES } from '../constants/theme';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const TimDetailScreen = ({ route, navigation }) => {
  const { team } = route.params;

  const openWebsite = async (url) => {
    if (!url) return;
    const supported = await Linking.canOpenURL(url);
    if (supported) {
      await Linking.openURL(url);
    } else {
      Alert.alert("Error", "Tidak bisa membuka URL ini.");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <Card style={styles.card}>
          <Card.Content>
            <Image source={{ uri: team.crest }} style={styles.emblem} />
            <Title style={styles.title}>{team.name}</Title>
            
            <View style={styles.infoRow}>
              <Icon name="stadium" size={20} color={COLORS.subtext} style={styles.icon} />
              <Paragraph style={styles.label}>Stadion:</Paragraph>
              <Paragraph style={styles.value}>{team.venue || 'N/A'}</Paragraph>
            </View>
            <View style={styles.infoRow}>
              <Icon name="calendar-check" size={20} color={COLORS.subtext} style={styles.icon} />
              <Paragraph style={styles.label}>Tahun Berdiri:</Paragraph>
              <Paragraph style={styles.value}>{team.founded || 'N/A'}</Paragraph>
            </View>
            <View style={styles.infoRow}>
              <Icon name="web" size={20} color={COLORS.subtext} style={styles.icon} />
              <Paragraph style={styles.label}>Website:</Paragraph>
              <Paragraph 
                style={[styles.value, styles.link]} 
                onPress={() => openWebsite(team.website)}
              >
                {team.website ? 'Kunjungi Situs' : 'N/A'}
              </Paragraph>
            </View>
          </Card.Content>
        </Card>

        <Button
          mode="contained"
          style={styles.button}
          labelStyle={styles.buttonLabel}
          icon="account-group"
          onPress={() => navigation.navigate('Pemain', { 
            teamId: team.id,
            teamName: team.name 
          })}
        >
          Lihat Skuad Pemain
        </Button>
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
  card: {
    elevation: 1,
    borderRadius: SIZES.roundness,
    backgroundColor: COLORS.card,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginBottom: 20,
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
    alignItems: 'center',
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderColor: COLORS.border,
  },
  icon: {
    marginRight: 15,
  },
  label: {
    ...FONTS.body3,
    color: COLORS.subtext,
  },
  value: {
    ...FONTS.body3,
    color: COLORS.text,
    fontWeight: 'bold',
    flex: 1,
    textAlign: 'right',
  },
  link: {
    color: COLORS.primary,
    textDecorationLine: 'underline',
  },
  button: {
    backgroundColor: COLORS.primary,
    paddingVertical: 8,
    borderRadius: SIZES.roundness,
  },
  buttonLabel: {
    ...FONTS.body2,
    fontWeight: 'bold',
  }
});

export default TimDetailScreen;