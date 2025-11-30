import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import WelcomeScreen from '../screens/WelcomeScreen';
import DoctorLoginScreen from '../screens/DoctorLoginScreen';
import PatientLoginScreen from '../screens/PatientLoginScreen';
import BluetoothScreen from '../screens/BluetoothScreen';
import DoctorDashboardScreen from '../screens/DoctorDashboardScreen';
import PatientDashboardScreen from '../screens/PatientDashboardScreen';

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Welcome">
        
        <Stack.Screen name="Welcome" component={WelcomeScreen} options={{ headerShown: false }} />
        <Stack.Screen name="BluetoothConnect" component={BluetoothScreen} options={{ title: 'Bluetooth Ayarları' }} />
        <Stack.Screen name="DoctorLogin" component={DoctorLoginScreen} options={{ title: 'Doktor Girişi' }} />
        <Stack.Screen name="PatientLogin" component={PatientLoginScreen} options={{ title: 'Hasta Girişi' }} />
        <Stack.Screen name="DoctorDashboard" component={DoctorDashboardScreen} options={{ headerShown: false }} />
        <Stack.Screen name="PatientDashboard" component={PatientDashboardScreen} options={{ headerShown: false }} />

      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;