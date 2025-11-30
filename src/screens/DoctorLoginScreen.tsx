import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  StyleSheet, 
  Alert 
} from 'react-native';

const DoctorLoginScreen = ({ navigation }: any) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    navigation.navigate('DoctorDashboard'); 
  };

  const handleBiometricLogin = () => {
    // Simülasyon: Parmak izi okundu sayıyoruz
    Alert.alert('Başarılı', 'Parmak izi doğrulandı, panele yönlendiriliyorsunuz...');
    navigation.navigate('DoctorDashboard');
  };

  return (
    <View style={styles.container}>
      
      {/* Başlık ve İkon */}
      <View style={styles.headerContainer}>
        <Text style={styles.headerEmoji}>👨‍⚕️</Text>
        <Text style={styles.headerTitle}>Doktor Girişi</Text>
        <Text style={styles.headerSubtitle}>Sisteme erişmek için kimliğinizi doğrulayın</Text>
      </View>

      {/* Form Alanı */}
      <View style={styles.formContainer}>
        <Text style={styles.label}>Email / Kullanıcı Adı</Text>
        <TextInput
          style={styles.input}
          placeholder="doktor@hastane.com"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <Text style={styles.label}>Şifre</Text>
        <TextInput
          style={styles.input}
          placeholder="******"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />

        {/* Giriş Butonu */}
        <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
          <Text style={styles.loginButtonText}>Giriş Yap</Text>
        </TouchableOpacity>

        {/* Araya Çizgi (VEYA) */}
        <View style={styles.dividerContainer}>
          <View style={styles.dividerLine} />
          <Text style={styles.dividerText}>VEYA</Text>
          <View style={styles.dividerLine} />
        </View>

        {/* Parmak İzi Butonu */}
        <TouchableOpacity 
          style={styles.biometricButton} 
          onPress={handleBiometricLogin}
        >
          <Text style={styles.biometricEmoji}>☝️</Text> 
          <Text style={styles.biometricText}>Parmak İzi ile Giriş</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    padding: 20,
  },
  headerContainer: {
    marginTop: 50,
    alignItems: 'center',
    marginBottom: 40,
  },
  headerEmoji: {
    fontSize: 60,
    marginBottom: 10,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
  },
  formContainer: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 15,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 5,
    marginTop: 10,
  },
  input: {
    backgroundColor: '#f1f3f5',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#dee2e6',
  },
  loginButton: {
    backgroundColor: '#4dabf7',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#dee2e6',
  },
  dividerText: {
    marginHorizontal: 10,
    color: '#adb5bd',
    fontWeight: 'bold',
  },
  biometricButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#4dabf7',
    padding: 10,
    borderRadius: 10,
    backgroundColor: '#e7f5ff',
  },
  biometricEmoji: {
    fontSize: 24,
  },
  biometricText: {
    marginLeft: 10,
    color: '#4dabf7',
    fontSize: 16,
    fontWeight: '600',
  }
});

export default DoctorLoginScreen;