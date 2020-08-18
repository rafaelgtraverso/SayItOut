import React from 'react';
import { View } from 'react-native';
import s from '../css/styles';
import { Text, Button } from 'react-native-elements';

const HomeScreen = ({navigation}) => {
    return (
        <View>
            <Text style={s.text}> HomeScreen </Text>
            <Button title='Create Card' onPress={() => navigation.navigate('Create Card')} />
        </View>
    );
};



export default HomeScreen;