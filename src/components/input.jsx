import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import LinearGradient from 'react-native-linear-gradient';
import { windowHeight, windowWidth } from '../utils/dimention';

const SearchInput = ({ ...props }) => {
    return (
        <LinearGradient
            colors={['#1C1B33', '#2E335A']}
            style={style.inputContainer}
        >
            <View style={style.iconContainer}>
                <Icon
                    name={'search1'}
                    style={style.icon}
                />
            </View>
            <TextInput
                autoCorrect={false}
                placeholder='Search City'
                placeholderTextColor={'#FFFFFF'}
                style={{ color: 'grey', flex: 1 }}
                {...props}
            />
        </LinearGradient>
    );
};

const style = StyleSheet.create({
    inputContainer: {
        height: windowHeight / 15,
        width: windowWidth / 1.13,
        backgroundColor: '#1C1B33',
        flexDirection: 'row',
        paddingHorizontal: 15,
        borderRadius: 30,
        justifyContent: 'center',
    },
    icon: {
        color: '#FFFFFF',
        fontSize: 19,
        marginHorizontal: '1%'
    },
    iconContainer: {
        justifyContent: 'center',
    }
});

export default SearchInput;