import React from 'react';
import LottieView from 'lottie-react-native';
import { View, Text, StyleSheet } from 'react-native';

const Error = ({ message }) => (
    <View style={styles.errorContainer}>
        <LottieView source={require('../assets/animations/rainWithThunder.json')} autoPlay speed={1} style={{ width: 250, height: 250 }} />
        <Text style={styles.errorMessage}>{message}</Text>
    </View>
);

const styles = StyleSheet.create({
    errorContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
    },
    errorMessage: {
        fontSize: 16,
        color: 'red',
        fontWeight: 'bold',
        textAlign: 'center',
    },
});

export default Error;