import React from 'react';
import { View } from 'react-native';
import s from '../css/styles';
import { Text, Button } from 'react-native-elements';
import { NavigationEvents } from 'react-navigation';

const SignUpScreen = ({navigation}) => {
    return (
        <View>
            <Text style={s.text}> SignUpScreen </Text>
            <Text></Text>
            <Button title='Sign in' onPress={() => navigation.navigate('Sign In')} />
        </View>
    );
};

export default SignUpScreen;