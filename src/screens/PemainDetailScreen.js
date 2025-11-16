import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import { Card, Title, Paragraph, Avatar } from 'react-native-paper';
import { COLORS, FONTS, SIZES } from '../constants/theme';
import { format } from 'date-fns';
import { id as idLocale } from 'date-fns/locale';

const InfoRow = ({ icon, label, value }) => (
  <View style={styles.infoRow}>
    <Avatar.Icon size={40} icon={icon} style={styles.icon} color={COLORS.primary} />
    <View style={styles.infoTextContainer}>
      <Paragraph style={styles.label}>{label}</Paragraph>
      <Paragraph style={styles.value}>{value}</Paragraph>
    </View>
  </View>
);

const PemainDetailScreen = ({ route }) => {
  const { player } = route.params;

  const getAge = (dateString) => {
    if (!dateString) return 'N/A';
    try {
      return format(new Date(), 'yyyy') - format(new Date(dateString), 'yyyy');
    } catch (e) {
      return 'N/A';
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    try {
      return format(new Date(dateString), 'd MMMM yyyy', { locale: idLocale });
    } catch (e) {
      return 'N/A';
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.header}>
          <Avatar.Icon size={120} icon="account" style={styles.avatar} />
          <Title style={styles.title}>{player.name}</Title>
        </View>
        
        <Card style={styles.card}>
          <Card.Content>
            <InfoRow 
              icon="flag" 
              label="Kebangsaan" 
              value={player.nationality || 'N/A'} 
            />
            <InfoRow 
              icon="tshirt-crew" 
              label="Posisi" 
              value={player.position || 'N/A'} 
            />
            <InfoRow 
              icon="calendar" 
              label="Tanggal Lahir" 
              value={formatDate(player.dateOfBirth)} 
            />
            <InfoRow 
              icon="cake-variant" 
              label="Usia" 
              value={`${getAge(player.dateOfBirth)} tahun`}
            />
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
    flex: 1,
  },
  header: {
    backgroundColor: COLORS.card,
    paddingVertical: 30,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
    marginBottom: 16,
  },
  avatar: { 
    backgroundColor: COLORS.primary,
  },
  title: {
    ...FONTS.h2,
    color: COLORS.text,
    marginTop: 16,
  },
  card: {
    marginHorizontal: 16,
    borderRadius: SIZES.roundness,
    backgroundColor: COLORS.card,
    elevation: 1,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderColor: COLORS.border,
  },
  icon: {
    backgroundColor: 'transparent',
  },
  infoTextContainer: {
    marginLeft: 10,
  },
  label: {
    ...FONTS.body4,
    color: COLORS.subtext,
  },
  value: {
    ...FONTS.body3,
    color: COLORS.text,
    fontWeight: 'bold',
  }
});

export default PemainDetailScreen;