import React, { useState } from 'react';
import { View, StyleSheet, SafeAreaView, Text, Alert, ScrollView } from 'react-native';
import { Title, Button, TextInput } from 'react-native-paper';
import { useAuth } from '../context/AuthContext';
import { COLORS, FONTS, SIZES } from '../constants/theme';
import AuthBackground from '../components/AuthBackground';

const LoginScreen = ({ navigation }) => {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Email dan password tidak boleh kosong.');
      return;
    }
    setLoading(true);
    const { error } = await login(email, password);
    setLoading(false);
    if (error) {
      Alert.alert('Login Gagal', error.message);
    }
  };

  return (
    <AuthBackground>
      <SafeAreaView style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <Text style={styles.headerText}>MASUK</Text>
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

            <Button
              mode="contained"
              style={styles.button}
              labelStyle={styles.buttonLabel}
              onPress={handleLogin}
              loading={loading}
              disabled={loading}
            >
              {loading ? 'Loading...' : 'Masuk'}
            </Button>
            
            <View style={styles.footerContainer}>
              <Text style={styles.footerText}>Belum punya akun?</Text>
              <Button
                mode="text"
                labelStyle={styles.footerButtonLabel}
                onPress={() => navigation.navigate('Register')}
                disabled={loading}
              >
                Daftar
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

export default LoginScreen;