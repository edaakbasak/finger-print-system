import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const WelcomeScreen = ({ navigation }: any) => {

  return (
    <View style={styles.container}>
      {/* Başlık Bölümü */}
      <Text style={styles.title}>Akıllı İlaç Kutusu</Text>
      <Text style={styles.subtitle}>Lütfen giriş türünü seçiniz</Text>

      {/* Kartların Olduğu Kutu (Yan Yana) */}
      <View style={styles.selectionContainer}>
        {/* Doktor Seçimi */}
        <TouchableOpacity 
          style={[styles.card, styles.doctorCard]} 
          onPress={() => navigation.navigate('DoctorLogin')}
        >
          <Text style={styles.cardEmoji}>👨‍⚕️</Text>
          <Text style={styles.cardText}>Doktor Girişi</Text>
        </TouchableOpacity>

        {/* Hasta Seçimi */}
        <TouchableOpacity 
          style={[styles.card, styles.patientCard]} 
          onPress={() => navigation.navigate('PatientLogin')}
        >
          <Text style={styles.cardEmoji}>🤒</Text>
          <Text style={styles.cardText}>Hasta Girişi</Text>
        </TouchableOpacity>
      </View>

      {/* Bluetooth Butonu */}
      <TouchableOpacity 
        style={styles.bluetoothButton} 
        onPress={() => navigation.navigate('BluetoothConnect')}
      >
        <Text style={styles.bluetoothText}>
          ⚙️ Bluetooth Ayarları / Cihaz Bağla
        </Text>
      </TouchableOpacity>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 40,
  },
  selectionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  card: {
    width: '48%',
    height: 180,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  doctorCard: {
    backgroundColor: '#fff',
    borderWidth: 2,
    borderColor: '#4dabf7', 
  },
  patientCard: {
    backgroundColor: '#fff',
    borderWidth: 2,
    borderColor: '#fab005', 
  },
  cardEmoji: {
    fontSize: 50,
    marginBottom: 15,
  },
  cardText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  
  bluetoothButton: {
    marginTop: 40,
    padding: 15,
    borderRadius: 8,
    backgroundColor: '#e7f5ff', 
  },
  bluetoothText: {
    color: '#4dabf7',
    textDecorationLine: 'underline',
    fontWeight: '600',
    fontSize: 16,
  }
});

export default WelcomeScreen;