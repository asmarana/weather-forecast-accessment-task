import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import LottieView from 'lottie-react-native';
import { ConditionAnimation } from './animations';
import Feather from 'react-native-vector-icons/Feather'

const WeatherDisplay = ({ weatherData }) => {
    const { current, location } = weatherData;
    const localTime = location.localtime;
    const time = localTime.split(' ')[1];

    return (
        <View style={styles.textContainer}>
            <Text style={styles.locationText}>{location.region}, {location.country}</Text>
            <Text style={styles.temperatureText}>{current.temp_c}°C</Text>
            <LottieView source={ConditionAnimation[current.condition.text]} autoPlay speed={1} style={{ width: 150, height: 150 }} />
            <Text style={styles.conditionText}>{current.condition.text}</Text>
            <View style={styles.infoRow}>
                <View style={styles.iconContainer}>
                    <Feather name="wind" size={24} color="white" />
                    <Text style={styles.iconText}>{current.wind_kph}km</Text>
                </View>
                <View style={styles.iconContainer}>
                    <Feather name="droplet" size={24} color="white" />
                    <Text style={styles.iconText}>{current.humidity}%</Text>
                </View>
                <View style={styles.iconContainer}>
                    <Feather name="clock" size={24} color="white" />
                    <Text style={styles.iconText}>{time}</Text>
                </View>
            </View>
        </View>
    );
};

export default WeatherDisplay;

const styles = StyleSheet.create({
    textContainer: {
        alignItems: 'center',
    },
    locationText: {
        color: 'white',
        fontSize: 22,
        fontWeight: '100',
        marginBottom: 5,
        textAlign: 'center',
    },
    temperatureText: {
        color: 'white',
        fontSize: 66,
        fontWeight: '100',
    },
    conditionText: {
        color: 'rgba(255, 255, 255, 0.7)',
        fontSize: 19,
        fontWeight: '700',
        marginBottom: '4%',
    },
    infoRow: {
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    infoText: {
        color: 'white',
        fontSize: 19,
        fontWeight: '700',
        paddingHorizontal: '4%',

    },
    iconContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: '10%',
    },
    iconText: {
        fontSize: 12,
        marginLeft: '8%',
    },
})
