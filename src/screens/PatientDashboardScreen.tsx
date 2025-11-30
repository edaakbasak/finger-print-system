import React, { useContext } from 'react'; // useContext eklendi
import { 
  View, Text, StyleSheet, TouchableOpacity, SafeAreaView, FlatList, Alert 
} from 'react-native';
import { PatientContext } from '../context/PatientContext'; // Context eklendi

const PatientDashboardScreen = ({ navigation }: any) => {
  const { patients, markAsTaken } = useContext(PatientContext);

  const myData = patients.find((p: any) => p.id === '1');

  const handleDispensePills = () => {
    if (myData.status.includes('✅')) {
      Alert.alert('Bilgi', 'Bugünkü dozunuzu zaten aldınız. Kutu kilitli.');
      return;
    }

    Alert.alert(
      'İlaç Kutusu',
      'Kutuyu açmak için parmak izinizi okutun...',
      [
        { text: 'İptal', style: 'cancel' },
        { 
          text: 'Okut (Simüle Et)', 
          onPress: () => {
            markAsTaken('1'); 
            
            Alert.alert('Afiyet Olsun', 'Kutu açıldı, bilgi doktora iletildi.');
          } 
        }
      ]
    );
  };

  const renderMedicineItem = ({ item }: { item: string }) => (
    <View style={styles.medCard}>
      <View style={styles.medIconBack}><Text style={{fontSize: 20}}>💊</Text></View>
      <View style={{marginLeft: 15}}>
        <Text style={styles.medName}>{item}</Text>
        <Text style={styles.medDose}>1 Adet</Text> 
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>Geçmiş Olsun,</Text>
          <Text style={styles.patientName}>{myData?.name}</Text>
        </View>
        <TouchableOpacity style={styles.logoutButton} onPress={() => navigation.navigate('Welcome')}>
          <Text style={styles.logoutText}>Çıkış</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.heroContainer}>
        <TouchableOpacity 
          style={[
            styles.circleButton, 
            { backgroundColor: myData?.status.includes('✅') ? '#40c057' : '#fab005' }
          ]}
          onPress={handleDispensePills}
        >
          <Text style={styles.circleIcon}>{myData?.status.includes('✅') ? '😊' : '👇'}</Text>
          <Text style={styles.circleText}>{myData?.status.includes('✅') ? 'Alındı' : 'İlaçları Ver'}</Text>
        </TouchableOpacity>

        <Text style={styles.statusText}>
          Durum: {myData?.status}
        </Text>
        <Text style={styles.lastTimeText}>Son İşlem: {myData?.lastAction}</Text>
      </View>

      <Text style={styles.sectionTitle}>Bugünkü İlaçlarınız</Text>

      <FlatList
        data={myData?.medicines} 
        renderItem={renderMedicineItem}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={{paddingBottom: 20}}
      />
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fffbe6', padding: 20 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 30, marginTop: 10 },
  greeting: { fontSize: 16, color: '#666' },
  patientName: { fontSize: 22, fontWeight: 'bold', color: '#333' },
  logoutButton: { padding: 10, backgroundColor: '#ffe3e3', borderRadius: 8 },
  logoutText: { color: '#e03131', fontWeight: 'bold' },
  heroContainer: { alignItems: 'center', marginBottom: 40, backgroundColor: '#fff', padding: 20, borderRadius: 20, elevation: 3 },
  circleButton: { width: 160, height: 160, borderRadius: 80, justifyContent: 'center', alignItems: 'center', marginBottom: 15, elevation: 10, borderWidth: 4, borderColor: '#fff' },
  circleIcon: { fontSize: 50, marginBottom: 5 },
  circleText: { fontSize: 20, fontWeight: 'bold', color: '#fff' },
  statusText: { fontSize: 18, fontWeight: 'bold', color: '#333' },
  lastTimeText: { fontSize: 14, color: '#999', marginTop: 5 },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', color: '#333', marginBottom: 15 },
  medCard: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff', padding: 15, borderRadius: 12, marginBottom: 10, borderWidth: 1, borderColor: '#eee' },
  medIconBack: { backgroundColor: '#fcc419', padding: 10, borderRadius: 10 },
  medName: { fontSize: 16, fontWeight: 'bold', color: '#333' },
  medDose: { fontSize: 14, color: '#666' },
});

export default PatientDashboardScreen;