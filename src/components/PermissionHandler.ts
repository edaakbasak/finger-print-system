import { PermissionsAndroid, Platform } from 'react-native';

export const requestBluetoothPermissions = async () => {
  if (Platform.OS === 'android') {
    try {
      // Android 12 (API 31) ve üzeri için
      if (Platform.Version >= 31) {
        const result = await PermissionsAndroid.requestMultiple([
          PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN,
          PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT,
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        ]);
        return result['android.permission.BLUETOOTH_CONNECT'] === 'granted';
      } 
      // Android 11 ve altı için
      else {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
        );
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      }
    } catch (err) {
      console.warn(err);
      return false;
    }
  }
  return true;
};