import React, { useEffect } from 'react'
import Home from './src/screens/home'
import { PermissionsAndroid } from "react-native";

const App = () => {

  useEffect(() => {
    requestLocationPermission();
  }, [])

  const requestLocationPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Weather App Permission',
          message:
            'Weather App needs access to your location ' +
            'so you can check weather of your city.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('Access location');
      } else {
        console.log('Location permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };


  return (
    <Home />
  )
}

export default App