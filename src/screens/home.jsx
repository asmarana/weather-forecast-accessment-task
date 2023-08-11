import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  ImageBackground,
} from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import ForecastTab from '../components/forcastTab';
import SearchInput from '../components/input';
import WeatherDisplay from '../components/weatherData';
import Error from '../components/error';
import Loader from '../components/loader';
import { windowHeight, windowWidth } from '../utils/dimention';
import { fetchWeatherForcast } from '../api/weather';
import { fetchCity } from '../api/reverseGeocoding';

const Home = () => {

  const [isLoading, setIsLoading] = useState(true);
  const [weatherData, setWeatherData] = useState(null);
  const [weeklyWeatherData, setWeeklyWeatherData] = useState(null);
  const [error, setError] = useState(null);

  let debounceTimeout;
  const defaultLatitude = 36.7783;
  const defaultLongitude = -119.4179;

  const handleSearch = value => {
    clearTimeout(debounceTimeout);
    debounceTimeout = setTimeout(() => {
      if (value.length > 2) {
        setIsLoading(true);
        fetchWeatherForcast({
          cityName: value,
          days: '7',
        })
          .then(data => {
            if (data && data.forecast && data.forecast.forecastday) {
              setWeatherData(data);
              setWeeklyWeatherData(data.forecast.forecastday);
              setError(null);
            } else {
              setError('City Not Found');
            }
            setIsLoading(false);
          })
          .catch(error => {
            setError('Error fetching weather forecast', error);
            setIsLoading(false);
          });
      }
    }, 1000);
  }

  const fetchWeatherData = async (latitude, longitude) => {
    try {
      const geolocationData = await fetchCity({
        format: 'json',
        latitude,
        longitude,
        language: 'en',
      });

      const cityName = geolocationData.address.state_district || geolocationData.address.county || 'City Not Found';
      const city = cityName.split(' ')[0];

      const weatherData = await fetchWeatherForcast({
        cityName: city,
        days: '7',
      });

      setWeatherData(weatherData);
      setWeeklyWeatherData(weatherData.forecast.forecastday);

      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching geolocation or weather data:', error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    setIsLoading(true);

    const options = {
      enableHighAccuracy: true,
      timeout: 200000,
      maximumAge: 1000,
    };

    Geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        fetchWeatherData(latitude, longitude);
      },
      (error) => {
        console.error('Geolocation error:', error);
        fetchWeatherData(defaultLatitude, defaultLongitude);
      },
      options
    );
  }, []);

  useEffect(() => {
    setIsLoading(true);

    const options = {
      enableHighAccuracy: true,
      timeout: 200000,
      maximumAge: 1000,
    };

    Geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        fetchWeatherData(latitude, longitude);
      },
      (error) => {
        console.error('Geolocation error:', error);
        fetchWeatherData(defaultLatitude, defaultLongitude);
      },
      options
    );
  }, []);

  const backgroundImg = require('../assets/images/bgImage.jpg');

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <View style={styles.container}>
          <ImageBackground source={backgroundImg} style={styles.backgroundImage} />
          <View style={styles.searchContainer}>
            <SearchInput onChangeText={handleSearch} />
          </View>
          <View style={styles.textContainer}>
            {error ? (
              <Error message={error} />
            ) : (
              weatherData && <WeatherDisplay weatherData={weatherData} />
            )}
          </View>
          <View style={styles.forecastTabContainer} >
            {!error && weeklyWeatherData && <ForecastTab forecastData={weeklyWeatherData} />}
          </View>
        </View >)}</>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    height: windowHeight,
    width: windowWidth,
    position: 'absolute',
  },
  searchContainer: {
    margin: '4%',
    alignItems: 'center',
    flex: 0.2,
  },
  textContainer: {
    padding: 20,
    alignItems: 'center',
    flex: 5,
  },
  forecastTabContainer: {
    backgroundColor: '#2E335A',
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    paddingBottom: 15,
    flex: 3,
  },
});
