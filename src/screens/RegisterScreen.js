import React, { useState } from 'react';
import { View, StyleSheet, SafeAreaView, Text, Alert, ScrollView } from 'react-native';
import { Title, Button, TextInput } from 'react-native-paper';
import { COLORS, FONTS, SIZES } from '../constants/theme';
import { useAuth } from '../context/AuthContext';
import AuthBackground from '../components/AuthBackground';

const RegisterScreen = ({ navigation }) => {
  const { register } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    if (!email || !password || !confirmPassword) {
      Alert.alert('Error', 'Semua kolom tidak boleh kosong.');
      return;
    }
    if (password !== confirmPassword) {
      Alert.alert('Error', 'Password dan Konfirmasi Password tidak cocok.');
      return;
    }

    setLoading(true);
    const { error } = await register(email, password);
    setLoading(false);

    if (error) {
      Alert.alert('Daftar Gagal', error.message);
    } else {
      Alert.alert('Daftar Berhasil', 'Silakan cek email Anda untuk verifikasi.');
      navigation.goBack();
    }
  };

  return (
    <AuthBackground>
      <SafeAreaView style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <Text style={styles.headerText}>DAFTAR</Text>
          <Text style={styles.logoText}>JadwalBola</Text>

          <View style={styles.card}>
            <TextInput
              label="Email"
              mode="outlined"
              style={styles.input}
              activeOutlineColor={COLORS.primary}
              onChangeText={setEmail}
              value={email}
              keyboardType="email-address"
              autoCapitalize="none"
              left={<TextInput.Icon icon="account-outline" color={COLORS.subtext} />}
            />
            <TextInput
              label="Password"
              mode="outlined"
              style={styles.input}
              activeOutlineColor={COLORS.primary}
              onChangeText={setPassword}
              value={password}
              secureTextEntry
              left={<TextInput.Icon icon="lock-outline" color={COLORS.subtext} />}
            />
            <TextInput
              label="Konfirmasi Password"
              mode="outlined"
              style={styles.input}
              activeOutlineColor={COLORS.primary}
              onChangeText={setConfirmPassword}
              value={confirmPassword}
              secureTextEntry
              left={<TextInput.Icon icon="lock-check-outline" color={COLORS.subtext} />}
            />

            <Button
              mode="contained"
              style={styles.button}
              labelStyle={styles.buttonLabel}
              onPress={handleRegister}
              loading={loading}
              disabled={loading}
            >
              {loading ? 'Loading...' : 'Daftar'}
            </Button>
            
            <View style={styles.footerContainer}>
              <Text style={styles.footerText}>Sudah punya akun?</Text>
              <Button
                mode="text"
                labelStyle={styles.footerButtonLabel}
                onPress={() => navigation.goBack()}
                disabled={loading}
              >
                Masuk
              </Button>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </AuthBackground>
  );
};

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    width: '100%',
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
  },
  headerText: {
    ...FONTS.h2,
    color: COLORS.card,
    fontWeight: 'bold',
    letterSpacing: 2,
    marginBottom: 20, 
    textAlign: 'center', 
  },
  logoText: {
    ...FONTS.h1,
    fontSize: 44,
    color: COLORS.primary,
    fontWeight: '800',
    marginBottom: 40, 
    textShadowColor: 'rgba(0, 0, 0, 0.2)', 
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  card: {
    width: '90%',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 20,
    padding: 24,
    elevation: 5,
  },
  input: { 
    marginBottom: 16,
    backgroundColor: COLORS.card,
  },
  button: { 
    marginTop: 10, 
    paddingVertical: 8, 
    backgroundColor: COLORS.primary,
    borderRadius: SIZES.roundness,
  },
  buttonLabel: {
    ...FONTS.body2,
    fontWeight: 'bold',
  },
  footerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  footerText: {
    ...FONTS.body3,
    color: COLORS.subtext,
  },
  footerButtonLabel: {
    ...FONTS.body3,
    color: COLORS.primary,
    fontWeight: 'bold',
  }
});

export default RegisterScreen;