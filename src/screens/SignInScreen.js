import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import s from '../css/styles';
import { Text, Button } from 'react-native-elements';

const SignInScreen = ({navigation}) => {
    return (
        <View>
            <Text style={s.text}> SignInScreen </Text>
            <Button title='Sign Up' onPress={() => navigation.navigate('Sign Up')} />
        </View>
    );
};

export default SignInScreen;