import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { windowHeight, windowWidth } from '../utils/dimention'
import LottieView from 'lottie-react-native'

const Loader = () => {
    return (
        <View style={styles.loaderContainer}>
            <LottieView source={require('../assets/animations/loader.json')} autoPlay speed={1} style={{ width: 350, height: 350 }} />
        </View>
    )
}

export default Loader

const styles = StyleSheet.create({
    loaderContainer: {
        justifyContent: 'center',
        alignContent: 'center',
        backgroundColor: '#fff',
        height: windowHeight,
        width: windowWidth,
    },
})