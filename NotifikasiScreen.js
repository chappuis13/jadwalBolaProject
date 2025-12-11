import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  SafeAreaView, 
  FlatList, 
  ActivityIndicator, 
  ScrollView, 
  TouchableOpacity, 
  useWindowDimensions 
} from 'react-native';
import { Title, Button } from 'react-native-paper';
import { useAuth } from '../context/AuthContext';
import { getFinishedMatches, LEAGUE_CODES } from '../services/api'; 
import MatchResultCard from '../components/MatchResultCard'; 
import { COLORS, FONTS, SIZES } from '../constants/theme';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

// --- BAGIAN TUGAS: KONFIGURASI RESPONSIF ---
const BREAKPOINTS = {
  tablet: 768,
  largeTablet: 1024,
};

const NotifikasiScreen = () => {
  // --- STATE ASLI (JANGAN DIUBAH) ---
  const { isLoggedIn } = useAuth();
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(false);
  
  // --- STATE BARU (UNTUK TUGAS) ---
  const [showTask, setShowTask] = useState(false); // Toggle untuk buka/tutup tugas

  // --- LOGIKA TUGAS RESPONSIF ---
  const { width, height } = useWindowDimensions();
  const isLandscape = width > height;

  let deviceType = 'Mobile';
  if (width >= BREAKPOINTS.largeTablet) {
    deviceType = 'Large Tablet';
  } else if (width >= BREAKPOINTS.tablet) {
    deviceType = 'Tablet';
  }

  // --- LOGIKA ASLI (FETCH DATA) ---
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

  // --- KOMPONEN UI TUGAS (RENDERER) ---
  const renderTaskUI = () => {
    // Helper Styles untuk Tugas
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
      { title: 'Tugas Selesai', icon: 'checkbox-marked-circle-outline', desc: 'Implementasi Responsive Layout.' },
      { title: 'Breakpoint', icon: 'ruler', desc: 'Mobile, Tablet, & Large Tablet.' },
      { title: 'Orientasi', icon: 'phone-rotate-landscape', desc: 'Deteksi Portrait & Landscape.' },
      { title: 'Ikon', icon: 'star', desc: 'Ukuran ikon yang dinamis.' },
      { title: 'Grid', icon: 'view-grid', desc: 'Layout kolom otomatis.' },
      { title: 'Nilai A', icon: 'school', desc: 'Semoga dapat nilai bagus!' },
    ];

    return (
      <ScrollView contentContainerStyle={{ paddingBottom: 50 }}>
        <View style={getContainerStyle()}>
          {/* HERO SECTION */}
          <View style={isLandscape ? styles.heroLandscape : styles.heroPortrait}>
            <View>
              <Text style={styles.taskTitle}>MODUS: {deviceType.toUpperCase()}</Text>
              <Text style={styles.taskSubtitle}>
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

          {/* GRID KARTU */}
          <View style={styles.gridContainer}>
            {features.map((item, index) => (
              <View key={index} style={getCardStyle()}>
                <Icon 
                  name={item.icon} 
                  size={deviceType === 'Mobile' ? 30 : 45} 
                  color={COLORS.primary}
                  style={styles.cardIcon}
                />
                <View style={{ flex: 1 }}>
                  <Text style={styles.cardTitle}>{item.title}</Text>
                  <Text style={styles.cardDesc}>{item.desc}</Text>
                </View>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    );
  };

  // --- KOMPONEN UI ASLI (RENDERER) ---
  const renderOriginalUI = () => {
    const renderEmptyState = (icon, title, message) => (
      <View style={styles.center}>
        <Icon name={icon} size={80} color={COLORS.border} />
        <Title style={styles.emptyTitle}>{title}</Title>
        <Text style={styles.emptyText}>{message}</Text>
      </View>
    );

    if (!isLoggedIn) {
      return renderEmptyState(
        "login-variant", 
        "Login Dibutuhkan", 
        "Silakan login untuk melihat hasil pertandingan terbaru."
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
      return renderEmptyState(
        "bell-off-outline", 
        "Tidak Ada Hasil Terbaru", 
        "Hasil pertandingan terbaru akan muncul di sini."
      );
    }

    return (
      <FlatList
        data={matches}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <MatchResultCard match={item} />}
        contentContainerStyle={{ padding: 16 }}
      />
    );
  };

  // --- RENDER UTAMA ---
  return (
    <SafeAreaView style={styles.container}>
      {/* TOMBOL TOGGLE (PINTU MASUK TUGAS) */}
      <View style={styles.toggleContainer}>
        <TouchableOpacity 
          onPress={() => setShowTask(!showTask)}
          style={styles.toggleButton}
        >
          <Icon name={showTask ? "arrow-left" : "school"} size={20} color="#fff" />
          <Text style={styles.toggleText}>
            {showTask ? "Kembali ke Notifikasi" : "Buka Tugas Kuliah"}
          </Text>
        </TouchableOpacity>
      </View>

      {/* KONTEN BERGANTIAN */}
      {showTask ? renderTaskUI() : renderOriginalUI()}

    </SafeAreaView>
  );
};

// --- STYLES (GABUNGAN ASLI & TUGAS) ---
const styles = StyleSheet.create({
  // Style Asli
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
  },

  // --- STYLE BARU (UNTUK TOMBOL & TUGAS) ---
  toggleContainer: {
    padding: 10,
    backgroundColor: COLORS.card,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
    alignItems: 'center',
  },
  toggleButton: {
    flexDirection: 'row',
    backgroundColor: COLORS.secondary,
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 20,
    alignItems: 'center',
  },
  toggleText: {
    color: '#fff',
    fontWeight: 'bold',
    marginLeft: 8,
  },

  // Container Styles Tugas
  containerMobile: { padding: 16 },
  containerTablet: { padding: 32, maxWidth: '90%', alignSelf: 'center', width: '100%' },
  containerLarge: { padding: 50, maxWidth: 1200, alignSelf: 'center', width: '100%' },

  // Hero Styles Tugas
  heroPortrait: {
    marginBottom: 20,
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    elevation: 2,
    borderLeftWidth: 5,
    borderLeftColor: COLORS.primary,
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
    borderLeftWidth: 5,
    borderLeftColor: COLORS.primary,
  },

  taskTitle: { fontSize: 22, fontWeight: 'bold', color: COLORS.primary },
  taskSubtitle: { fontSize: 16, color: '#666', marginBottom: 5 },

  // Grid Styles Tugas
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
  cardIcon: { marginBottom: 5, marginRight: 15 },
  cardTitle: { fontSize: 18, fontWeight: 'bold', color: '#333' },
  cardDesc: { color: '#666', fontSize: 14 },
});

export default NotifikasiScreen;