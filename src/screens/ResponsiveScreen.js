import React from 'react';
import { 
  SafeAreaView, 
  ScrollView, 
  View, 
  Text, 
  StyleSheet, 
  useWindowDimensions 
} from 'react-native';
import { COLORS } from '../constants/theme';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const BREAKPOINTS = {
  tablet: 768,
  largeTablet: 1024,
};

export default function ResponsiveScreen() {
  const { width, height } = useWindowDimensions();

  const isLandscape = width > height;

  let deviceType = 'Mobile';
  if (width >= BREAKPOINTS.largeTablet) {
    deviceType = 'Large Tablet';
  } else if (width >= BREAKPOINTS.tablet) {
    deviceType = 'Tablet';
  }

  const getContainerStyle = () => {
    if (deviceType === 'Large Tablet') return styles.containerLarge;
    if (deviceType === 'Tablet') return styles.containerTablet;
    return styles.containerMobile;
  };

  const getCardStyle = () => {
    if (deviceType === 'Large Tablet') return styles.cardLarge;
    if (deviceType === 'Tablet') return styles.cardTablet;
    return styles.cardMobile;
  };

  const features = [
    { title: 'Analisis', icon: 'chart-bar', desc: 'Lihat data statistik tim.' },
    { title: 'Pemain', icon: 'account-group', desc: 'Daftar skuad lengkap.' },
    { title: 'Jadwal', icon: 'calendar-clock', desc: 'Waktu pertandingan.' },
    { title: 'Favorit', icon: 'star', desc: 'Tim kesayangan Anda.' },
    { title: 'Berita', icon: 'newspaper', desc: 'Kabar terbaru liga.' },
    { title: 'Setting', icon: 'cog', desc: 'Pengaturan aplikasi.' },
  ];

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView>
        <View style={getContainerStyle()}>
          
          <View style={isLandscape ? styles.heroLandscape : styles.heroPortrait}>
            <View>
              <Text style={styles.title}>MODUS: {deviceType.toUpperCase()}</Text>
              <Text style={styles.subtitle}>
                Posisi: {isLandscape ? "LANDSCAPE" : "PORTRAIT"}
              </Text>
              <Text>Dimensi: {Math.floor(width)} x {Math.floor(height)}</Text>
            </View>
            
            <Icon 
              name={deviceType === 'Mobile' ? 'cellphone' : 'tablet'} 
              size={isLandscape ? 60 : 40} 
              color={COLORS.primary} 
            />
          </View>

          <View style={styles.gridContainer}>
            {features.map((item, index) => (
              <View key={index} style={getCardStyle()}>
                <Icon 
                  name={item.icon} 
                  size={deviceType === 'Mobile' ? 30 : 40} 
                  color={COLORS.primary}
                  style={styles.cardIcon}
                />
                <View>
                  <Text style={styles.cardTitle}>{item.title}</Text>
                  <Text style={styles.cardDesc}>{item.desc}</Text>
                </View>
              </View>
            ))}
          </View>

        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#f5f5f5' },

  containerMobile: { padding: 16 },
  containerTablet: { padding: 32, maxWidth: '90%', alignSelf: 'center', width: '100%' },
  containerLarge: { padding: 50, maxWidth: 1200, alignSelf: 'center', width: '100%' },

  heroPortrait: {
    marginBottom: 20,
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    elevation: 2,
  },
  heroLandscape: {
    marginBottom: 20,
    backgroundColor: '#fff',
    padding: 30,
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    elevation: 2,
  },

  title: { fontSize: 22, fontWeight: 'bold', color: COLORS.primary },
  subtitle: { fontSize: 16, color: '#666', marginBottom: 5 },

  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },

  cardMobile: {
    width: '100%',
    backgroundColor: '#fff',
    padding: 16,
    marginBottom: 12,
    borderRadius: 8,
    elevation: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  cardTablet: {
    width: '48%',
    backgroundColor: '#fff',
    padding: 24,
    marginBottom: 20,
    borderRadius: 12,
    elevation: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardLarge: {
    width: '31%',
    backgroundColor: '#fff',
    padding: 30,
    marginBottom: 24,
    borderRadius: 16,
    elevation: 3,
    alignItems: 'center',
    justifyContent: 'center',
  },

  cardIcon: { marginBottom: 10, marginRight: 15 },
  cardTitle: { fontSize: 18, fontWeight: 'bold', color: '#333' },
  cardDesc: { color: '#666', fontSize: 14 },
});