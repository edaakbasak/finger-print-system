import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const PatientLoginScreen = ({ navigation }: any) => {

  const handleLogin = () => {
    // Direkt hasta paneline git
    navigation.navigate('PatientDashboard');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.emoji}>🤒</Text>
      <Text style={styles.title}>Hasta Girişi</Text>
      <Text style={styles.subtitle}>İlaçlarınızı almak için giriş yapın</Text>

      {/* Tek ve Büyük Bir Buton */}
      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.buttonText}>Panele Git</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fffbe6', // Sarı ton
  },
  emoji: { fontSize: 80, marginBottom: 20 },
  title: { fontSize: 28, fontWeight: 'bold', color: '#333' },
  subtitle: { fontSize: 16, color: '#666', marginBottom: 40 },
  loginButton: {
    backgroundColor: '#fab005', // Turuncu/Sarı buton
    paddingVertical: 15,
    paddingHorizontal: 60,
    borderRadius: 30,
    elevation: 5,
  },
  buttonText: { fontSize: 20, fontWeight: 'bold', color: '#fff' }
});

export default PatientLoginScreen;