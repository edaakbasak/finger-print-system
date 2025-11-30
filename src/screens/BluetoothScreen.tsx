import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  FlatList, 
  TouchableOpacity, 
  StyleSheet, 
  ActivityIndicator, 
  Alert 
} from 'react-native';

//simüsalyon amaçlı yorum satırı
//import RNBluetoothClassic from 'react-native-bluetooth-classic-apps-lib';
//import { requestBluetoothPermissions } from '../components/PermissionHandler';

const BluetoothScreen = ({ navigation }: any) => {
  const [devices, setDevices] = useState<any[]>([]);
  const [isScanning, setIsScanning] = useState(false);

  useEffect(() => {
    startScan();
  }, []);

   const startScan = async () => {
  //   const hasPermission = await requestBluetoothPermissions();
  //   if (!hasPermission) {
  //     Alert.alert('İzin Hatası', 'Bluetooth izinleri verilmedi.');
  //     return;
  //   }

  //   setIsScanning(true);
  //   try {
  //     const list = await RNBluetoothClassic.getBondedDevices();
  //     setDevices(list);
  //   } catch (error) {
  //     console.log('Tarama hatası:', error);
  //   } finally {
  //     setIsScanning(false);
  //   }

  //SAHTE VERİ
      setTimeout(() => {
      setDevices([
        { name: 'HC-05', address: '00:14:03:06:26:54', isConnected: () => false },
        { name: 'Galaxy Buds', address: '12:34:56:78:90:AB', isConnected: () => false },
      ]);
      setIsScanning(false);
    }, 1000);
  
  };
  const connectToDevice = async (device: any) => {
    // try {
    //   const isConnected = await device.isConnected();
    //   if (!isConnected) {
    //     await device.connect();
    //   }
    //   Alert.alert('Başarılı', `${device.name} cihazına bağlandı!`);
    //   navigation.navigate('Welcome'); 
      
    // } catch (error) {
    //   console.log('Bağlantı hatası:', error);
    //   Alert.alert('Hata', 'Bağlantı başarısız oldu.');
    // }

    //SAHTE BAĞLANMA
    Alert.alert('Simülasyon', `${device.name} cihazına bağlandı varsayılıyor.`);
    navigation.navigate('Welcome');
  };

  const renderItem = ({ item }: { item: any }) => (
    <TouchableOpacity style={styles.deviceItem} onPress={() => connectToDevice(item)}>
      <Text style={styles.deviceName}>{item.name}</Text>
      <Text style={styles.deviceId}>{item.address}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cihaz Seçimi</Text>
      <Text style={styles.subtitle}>HC-05 cihazını seçiniz</Text>
      
      {isScanning ? (
        <ActivityIndicator size="large" color="#4dabf7" />
      ) : (
        <FlatList
          data={devices}
          renderItem={renderItem}
          keyExtractor={(item) => item.address}
          ListEmptyComponent={
            <Text style={styles.emptyText}>
              Cihaz bulunamadı. Lütfen HC-05'i telefon ayarlarından eşleştirin.
            </Text>
          }
        />
      )}
      
      <TouchableOpacity style={styles.scanButton} onPress={startScan}>
        <Text style={styles.scanButtonText}>Yenile</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#f8f9fa' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 5, color: '#333' },
  subtitle: { fontSize: 16, color: '#666', marginBottom: 20 },
  deviceItem: {
    backgroundColor: '#fff',
    padding: 20,
    marginBottom: 10,
    borderRadius: 10,
    elevation: 2,
  },
  deviceName: { fontSize: 18, fontWeight: 'bold', color: '#333' },
  deviceId: { fontSize: 12, color: '#999' },
  scanButton: {
    backgroundColor: '#4dabf7',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  scanButtonText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
  emptyText: {
    textAlign: 'center',
    marginTop: 20,
    color: '#666',
    fontSize: 14,
  }
});

export default BluetoothScreen;