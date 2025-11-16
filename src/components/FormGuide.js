// src/components/FormGuide.js
import React from 'react';
import { View, StyleSheet } from 'react-native';
// Kita pakai 'Icon' dari library yang sudah pasti ter-install
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

// Fungsi helper ini kita taruh di luar agar bersih
const getIcon = (form, index) => {
  switch (form) {
    case 'W':
      return <Icon key={index} name="check-circle" size={18} color="#09AB54" style={styles.icon} />;
    case 'L':
      return <Icon key={index} name="close-circle" size={18} color="#ef4444" style={styles.icon} />;
    case 'D':
      return <Icon key={index} name="minus-circle" size={18} color="#888" style={styles.icon} />;
    default:
      // Ini adalah ikon strip abu-abu jika data tidak W, L, atau D
      return <Icon key={index} name="minus" size={18} color="#ccc" style={styles.icon} />;
  }
};

const FormGuide = ({ formString }) => {
  let formArray = [];

  // INI ADALAH BAGIAN AMAN (DEFENSIVE)
  // Kita cek apakah 'formString' ada isinya
  if (formString && typeof formString === 'string') {
    // Jika ada, kita ubah "W,L,D" menjadi ['W', 'L', 'D']
    formArray = formString.split(',');
  } else {
    // Jika data null atau kosong dari API, kita buat 5 ikon strip
    formArray = ['N/A', 'N/A', 'N/A', 'N/A', 'N/A'];
  }

  return (
    <View style={styles.container}>
      {/* Kita ambil 5 item pertama dari array dan tampilkan ikonnya */}
      {formArray.slice(0, 5).map((item, index) => getIcon(item, index))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'flex-start', // Rata kiri
    alignItems: 'center',
    flex: 1,
    paddingLeft: 10, // Beri padding agar tidak terlalu mepet
  },
  icon: {
    marginHorizontal: 2, // Jarak antar ikon
  }
});

export default FormGuide;