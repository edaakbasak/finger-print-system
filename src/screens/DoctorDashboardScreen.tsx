import React, { useState, useContext } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  FlatList, 
  TouchableOpacity, 
  SafeAreaView,
  Alert,
  Modal,
  TextInput,
  ScrollView
} from 'react-native';
import { PatientContext } from '../context/PatientContext'; // Ortak Hafızayı Çağırdık

const DoctorDashboardScreen = ({ navigation }: any) => {
  const { patients, updatePatientData } = useContext(PatientContext);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState<any>(null);
  const [newMedicineText, setNewMedicineText] = useState('');

  // --- YENİ HASTA EKLEME (ARDUINO SİMÜLASYONU) ---
  const handleAddNewPatient = () => {
    Alert.alert(
      'Yeni Hasta Kaydı',
      'Parmak izi sensörü aktif. Okuma yapılsın mı?',
      [
        { text: 'İptal', style: 'cancel' },
        { 
          text: 'Okut (Simüle Et)', 
          onPress: () => {
            const newId = String(patients.length + 1);
            const newPatient = {
              id: newId,
              name: `Yeni Hasta ${newId}`,
              status: '⚠️ Henüz Almadı',
              lastAction: '-',
              medicines: [] 
            };
            updatePatientData([...patients, newPatient]);
          } 
        }
      ]
    );
  };

  // --- DURUM DEĞİŞTİRME ---
  const toggleStatus = (patientId: string) => {
    const updatedList = patients.map((p: any) => {
      if (p.id === patientId) {
        const isTaken = p.status.includes('✅');
        return {
          ...p,
          status: isTaken ? '⚠️ Henüz Almadı' : '✅ İlaçlarını Aldı',
          lastAction: isTaken ? '-' : new Date().toLocaleTimeString().slice(0,5)
        };
      }
      return p;
    });
    
    updatePatientData(updatedList);
    
    setSelectedPatient(updatedList.find((p: any) => p.id === patientId));
  };

  // --- İLAÇ EKLEME ---
  const addMedicine = () => {
    if (newMedicineText.trim() === '') return;

    const updatedList = patients.map((p: any) => {
      if (p.id === selectedPatient.id) {
        const currentMeds = p.medicines || [];
        return { ...p, medicines: [...currentMeds, newMedicineText] };
      }
      return p;
    });

    updatePatientData(updatedList);
    setSelectedPatient(updatedList.find((p: any) => p.id === selectedPatient.id));
    setNewMedicineText('');
  };

  // --- İLAÇ SİLME ---
  const deleteMedicine = (indexToRemove: number) => {
    const updatedList = patients.map((p: any) => {
      if (p.id === selectedPatient.id) {
        const newMeds = p.medicines.filter((_: any, index: number) => index !== indexToRemove);
        return { ...p, medicines: newMeds };
      }
      return p;
    });

    updatePatientData(updatedList);
    setSelectedPatient(updatedList.find((p: any) => p.id === selectedPatient.id));
  };

  const handlePatientPress = (patient: any) => {
    setSelectedPatient(patient);
    setModalVisible(true);
  };

  const renderPatientItem = ({ item }: { item: any }) => (
    <TouchableOpacity onPress={() => handlePatientPress(item)}>
      <View style={styles.patientCard}>
        <View style={styles.patientInfo}>
          <Text style={styles.patientName}>{item.name}</Text>
          <Text style={[styles.patientStatus, { color: item.status.includes('✅') ? 'green' : '#e67700' }]}>
            {item.status}
          </Text>
        </View>
        <Text style={{fontSize: 20, color: '#ccc'}}>›</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>Merhaba,</Text>
          <Text style={styles.doctorName}>Dr. Eda Akbaşak</Text>
        </View>
        <TouchableOpacity style={styles.logoutButton} onPress={() => navigation.navigate('Welcome')}>
          <Text style={styles.logoutText}>Çıkış</Text>
        </TouchableOpacity>
      </View>

      {/* İstatistikler */}
      <View style={styles.statsContainer}>
        <View style={[styles.statCard, styles.statCardBlue]}>
          <Text style={styles.statNumber}>12</Text>
          <Text style={styles.statLabel}>Kapasite</Text>
        </View>
        <View style={[styles.statCard, styles.statCardGreen]}>
          <Text style={styles.statNumber}>{patients.length}</Text>
          <Text style={styles.statLabel}>Kayıtlı Hasta</Text>
        </View>
      </View>

      {/* YENİ HASTA BUTONU */}
      <TouchableOpacity style={styles.addButton} onPress={handleAddNewPatient}>
        <Text style={styles.addButtonIcon}>👆</Text>
        <Text style={styles.addButtonText}>Yeni Parmak İzi / Hasta Tanımla</Text>
      </TouchableOpacity>

      <Text style={styles.sectionTitle}>Hasta Listesi</Text>

      <FlatList
        data={patients}
        renderItem={renderPatientItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContent}
      />

      {/* --- DETAY PENCERESİ (MODAL) --- */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>{selectedPatient?.name}</Text>
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <Text style={styles.closeButton}>X</Text>
              </TouchableOpacity>
            </View>

            <ScrollView>
              <Text style={styles.label}>İlaç Alma Durumu:</Text>
              <TouchableOpacity 
                style={[styles.statusButton, { backgroundColor: selectedPatient?.status.includes('✅') ? '#d3f9d8' : '#fff3bf' }]}
                onPress={() => toggleStatus(selectedPatient.id)}
              >
                <Text style={{fontSize: 18, fontWeight: 'bold', color: '#333'}}>
                  {selectedPatient?.status}
                </Text>
                <Text style={{fontSize: 12, color: '#666', marginTop: 5}}>
                  (Değiştirmek için tıkla)
                </Text>
              </TouchableOpacity>

              <Text style={styles.label}>Kullanılan İlaçlar:</Text>
              {selectedPatient?.medicines && selectedPatient.medicines.map((med: string, index: number) => (
                <View key={index} style={styles.medicineItem}>
                  <Text style={styles.medicineText}>💊 {med}</Text>
                  <TouchableOpacity onPress={() => deleteMedicine(index)}>
                    <Text style={styles.deleteText}>Sil</Text>
                  </TouchableOpacity>
                </View>
              ))}

              <View style={styles.addMedicineContainer}>
                <TextInput 
                  style={styles.input}
                  placeholder="İlaç adı..."
                  value={newMedicineText}
                  onChangeText={setNewMedicineText}
                />
                <TouchableOpacity style={styles.addMedButton} onPress={addMedicine}>
                  <Text style={{color: '#fff', fontWeight: 'bold'}}>EKLE</Text>
                </TouchableOpacity>
              </View>

            </ScrollView>
          </View>
        </View>
      </Modal>

    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8f9fa', padding: 20 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20, marginTop: 10 },
  greeting: { fontSize: 16, color: '#666' },
  doctorName: { fontSize: 22, fontWeight: 'bold', color: '#333' },
  logoutButton: { padding: 10, backgroundColor: '#ffe3e3', borderRadius: 8 },
  logoutText: { color: '#e03131', fontWeight: 'bold' },
  statsContainer: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20 },
  statCard: { width: '48%', padding: 20, borderRadius: 15, alignItems: 'center' },
  statCardBlue: { backgroundColor: '#e7f5ff' },
  statCardGreen: { backgroundColor: '#e6fcf5' },
  statNumber: { fontSize: 24, fontWeight: 'bold', color: '#333' },
  statLabel: { fontSize: 14, color: '#666', marginTop: 5 },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', color: '#333', marginBottom: 15 },
  patientCard: { backgroundColor: '#fff', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 15, borderRadius: 12, marginBottom: 10, borderWidth: 1, borderColor: '#eee' },
  patientInfo: { flex: 1 },
  patientName: { fontSize: 16, fontWeight: 'bold', color: '#333' },
  patientStatus: { fontSize: 14, marginTop: 4 },
  listContent: { paddingBottom: 20 },
  addButton: {
    backgroundColor: '#4dabf7',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 18,
    borderRadius: 15,
    marginBottom: 25,
    elevation: 4,
  },
  addButtonIcon: { color: '#fff', marginRight: 10, fontSize: 20 },
  addButtonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center', padding: 20 },
  modalContent: { backgroundColor: '#fff', borderRadius: 20, padding: 20, maxHeight: '80%', elevation: 5 },
  modalHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 },
  modalTitle: { fontSize: 22, fontWeight: 'bold', color: '#333' },
  closeButton: { fontSize: 20, fontWeight: 'bold', color: '#999', padding: 5 },
  label: { fontSize: 16, fontWeight: '600', color: '#666', marginTop: 15, marginBottom: 10 },
  statusButton: { padding: 15, borderRadius: 10, alignItems: 'center', borderWidth: 1, borderColor: '#eee' },
  medicineItem: { flexDirection: 'row', justifyContent: 'space-between', backgroundColor: '#f8f9fa', padding: 12, borderRadius: 8, marginBottom: 8 },
  medicineText: { fontSize: 16, color: '#333' },
  deleteText: { color: 'red', fontWeight: 'bold' },
  addMedicineContainer: { flexDirection: 'row', marginTop: 10, marginBottom: 20 },
  input: { flex: 1, borderWidth: 1, borderColor: '#ddd', borderRadius: 8, padding: 10, marginRight: 10 },
  addMedButton: { backgroundColor: '#4dabf7', justifyContent: 'center', paddingHorizontal: 15, borderRadius: 8 }
});

export default DoctorDashboardScreen;