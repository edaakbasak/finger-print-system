import React, { createContext, useState, ReactNode } from 'react';

const INITIAL_PATIENTS = [
  { 
    id: '1', 
    name: 'Ahmet Yılmaz', 
    status: '⚠️ Henüz Almadı',
    lastAction: '-',
    medicines: ['Aspirin', 'Tansiyon İlacı'] 
  },
  { 
    id: '2', 
    name: 'Ayşe Demir', 
    status: '⚠️ Henüz Almadı', 
    lastAction: '-',
    medicines: ['İnsülin', 'Vitamin C'] 
  },
  { 
    id: '3', 
    name: 'Mehmet Öztürk', 
    status: '⚠️ Henüz Almadı', 
    lastAction: '-',
    medicines: ['Kalp İlacı'] 
  },
];

export const PatientContext = createContext<any>(null);

export const PatientProvider = ({ children }: { children: ReactNode }) => {
  const [patients, setPatients] = useState(INITIAL_PATIENTS);

  // Hasta İlacını Aldığında (Hasta Ekranı Kullanacak)
  const markAsTaken = (id: string) => {
    const updatedList = patients.map(p => {
      if (p.id === id) {
        return {
          ...p,
          status: '✅ İlaçlarını Aldı',
          lastAction: new Date().toLocaleTimeString().slice(0, 5)
        };
      }
      return p;
    });
    setPatients(updatedList);
  };

  // Doktor Durumu Değiştirdiğinde veya İlaç Eklediğinde (Doktor Ekranı Kullanacak)
  const updatePatientData = (newList: any[]) => {
    setPatients(newList);
  };

  return (
    <PatientContext.Provider value={{ patients, markAsTaken, updatePatientData }}>
      {children}
    </PatientContext.Provider>
  );
};