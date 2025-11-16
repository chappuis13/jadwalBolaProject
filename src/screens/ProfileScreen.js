import React from 'react';
import { View, StyleSheet, SafeAreaView, Alert } from 'react-native';
import { Title, Button, Avatar, Paragraph, List } from 'react-native-paper';
import { useAuth } from '../context/AuthContext';
import { COLORS, FONTS, SIZES } from '../constants/theme';

const ProfileScreen = ({ navigation }) => {
  const { logout, session } = useAuth();
  const [loading, setLoading] = React.useState(false);

  const handleLogout = async () => {
    setLoading(true);
    const { error } = await logout();
    setLoading(false);
    if (error) {
      Alert.alert('Logout Gagal', error.message);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Avatar.Icon size={100} icon="account" style={styles.avatar} />
        <Title style={styles.title}>Halo!</Title>
        <Paragraph style={styles.email}>
          {session?.user?.email}
        </Paragraph>
      </View>
      
      <List.Section style={styles.menuSection}>
        <List.Item
          title="Pengaturan Akun"
          description="Ubah password Anda"
          left={() => <List.Icon icon="cog" color={COLORS.primary} />}
          right={() => <List.Icon icon="chevron-right" />}
          onPress={() => navigation.navigate('Setting')}
        />
      </List.Section>

      <View style={styles.footer}>
        <Button
          mode="contained"
          style={styles.button}
          labelStyle={styles.buttonLabel}
          icon="logout"
          onPress={handleLogout}
          loading={loading}
          disabled={loading}
        >
          {loading ? 'Loading...' : 'Keluar'}
        </Button>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: COLORS.background,
  },
  header: {
    backgroundColor: COLORS.card,
    paddingVertical: 30, 
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  title: { 
    ...FONTS.h2,
    color: COLORS.text,
    marginTop: 20,
  },
  email: {
    ...FONTS.body3,
    color: COLORS.subtext,
    marginBottom: 10,
  },
  avatar: { 
    backgroundColor: COLORS.primary,
  },
  menuSection: {
    marginTop: 10,
    backgroundColor: COLORS.card,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
  },
  footer: {
    padding: 20,
  },
  button: { 
    paddingVertical: 8, 
    backgroundColor: COLORS.danger,
    borderRadius: SIZES.roundness,
    width: '100%',
  },
  buttonLabel: {
    ...FONTS.body2,
    fontWeight: 'bold',
  }
});

export default ProfileScreen;