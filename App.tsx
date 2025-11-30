// App.tsx
import React from 'react';
import { SafeAreaView, StatusBar } from 'react-native';
import { PatientProvider } from './src/context/PatientContext'; // 1. Hafıza Fişi
import AppNavigator from './src/navigation/AppNavigator';       // 2. Navigasyon Dosyası

const App = () => {
  return (
    <PatientProvider>
      <SafeAreaView style={{ flex: 1, backgroundColor: '#f8f9fa' }}>
        <StatusBar barStyle="dark-content" />
        <AppNavigator /> 
        
      </SafeAreaView>
    </PatientProvider>
  );
};

export default App;