import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import LottieView from 'lottie-react-native';
import { ConditionAnimation } from './animations';

const ForecastTab = ({ forecastData }) => {
    const [selectedTab, setSelectedTab] = useState('hourly');

    const renderHourlyForecastItem = ({ item }) => {
        const date = new Date(item.time);
        const hour = date.getHours();

        return (
            <View style={styles.forecastItem}>
                <Text style={styles.dayText}>{hour}:00</Text>
                <LottieView
                    source={ConditionAnimation[item.condition.text]}
                    autoPlay speed={1}
                    style={styles.weatherImage}
                />
                <Text style={styles.temperatureText}>{item.temp_c}°C</Text>
            </View>
        );
    };

    const renderWeeklyForecastItem = ({ item }) => {
        const date = new Date(item.date);
        const options = { weekday: 'short' };
        const dayName = date.toLocaleDateString('en-US', options).split(',')[0];

        return (
            <View style={styles.forecastItem}>
                <Text style={styles.dayText}>{dayName}</Text>
                <LottieView
                    source={ConditionAnimation[item.day.condition.text]}
                    autoPlay speed={1}
                    style={styles.weatherImage}
                />
                <Text style={styles.temperatureText}>{item.day.avgtemp_c}°C</Text>
            </View>
        );
    };

    return (
        <View>
            <View style={styles.tabContainer}>
                <TouchableOpacity
                    style={[
                        styles.tabButton,
                        selectedTab === 'hourly' && styles.selectedTabButton
                    ]}
                    onPress={() => setSelectedTab('hourly')}
                >
                    <Text style={styles.tabButtonText}>Hourly Forecast</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[
                        styles.tabButton,
                        selectedTab === 'weekly' && styles.selectedTabButton
                    ]}
                    onPress={() => setSelectedTab('weekly')}
                >
                    <Text style={styles.tabButtonText}>Weekly Forecast</Text>
                </TouchableOpacity>
            </View>
            <FlatList
                data={selectedTab === 'hourly' ? forecastData[0].hour : forecastData}
                keyExtractor={(item, index) => index.toString()}
                renderItem={selectedTab === 'hourly' ? renderHourlyForecastItem : renderWeeklyForecastItem}
                horizontal
                contentContainerStyle={styles.container}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: '1.5%',
    },
    forecastItem: {
        alignItems: 'center',
        marginRight: 10,
        backgroundColor: '#48319D',
        borderRadius: 30,
        padding: 7,
        paddingVertical: 16,
        borderColor: '#6c4ace',
        borderWidth: 1.4,
    },
    dayText: {
        fontSize: 16,
        marginBottom: 5,
        color: 'white',
    },
    weatherImage: {
        width: 50,
        height: 50,
        marginBottom: 5,
    },
    temperatureText: {
        fontSize: 14,
        color: 'white',
    },
    tabContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: 20,
    },
    tabButton: {
        alignItems: 'center',
        padding: 16,
        width: '50%',
        borderBottomWidth: 2,
        borderBottomColor: 'transparent',
    },
    selectedTabButton: {
        borderBottomColor: '#6c4ace',
    },
    tabButtonText: {
        color: '#CCCCCC',
        fontSize: 15,
        fontWeight: '500',
    },
});

export default ForecastTab;
