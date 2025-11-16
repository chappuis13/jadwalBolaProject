import React, { useState } from 'react';
import { View, StyleSheet, SafeAreaView, Alert } from 'react-native';
import { Title, Button, TextInput } from 'react-native-paper';
import { COLORS, FONTS, SIZES } from '../constants/theme';
import { supabase } from '../supabase/client';

const SettingScreen = ({ navigation }) => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChangePassword = async () => {
    if (!password || !confirmPassword) {
      Alert.alert('Error', 'Password tidak boleh kosong.');
      return;
    }
    if (password !== confirmPassword) {
      Alert.alert('Error', 'Password dan Konfirmasi Password tidak cocok.');
      return;
    }

    setLoading(true);
    const { error } = await supabase.auth.updateUser({ password: password });
    setLoading(false);

    if (error) {
      Alert.alert('Gagal', error.message);
    } else {
      Alert.alert('Berhasil', 'Password Anda telah berhasil diperbarui.');
      setPassword('');
      setConfirmPassword('');
      navigation.goBack();
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Title style={styles.title}>Ubah Password</Title>
        
        <TextInput
          label="Password Baru"
          mode="outlined"
          style={styles.input}
          activeOutlineColor={COLORS.primary}
          onChangeText={setPassword}
          value={password}
          secureTextEntry
          left={<TextInput.Icon icon="lock-outline" color={COLORS.subtext} />}
        />
        <TextInput
          label="Konfirmasi Password Baru"
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
          onPress={handleChangePassword}
          loading={loading}
          disabled={loading}
        >
          {loading ? 'Menyimpan...' : 'Simpan Perubahan'}
        </Button>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: COLORS.secondary,
  },
  content: {
    padding: 20,
    marginTop: 10,
  },
  title: { 
    ...FONTS.h3,
    color: COLORS.text,
    textAlign: 'left',
    marginBottom: 20,
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
  }
});

export default SettingScreen;