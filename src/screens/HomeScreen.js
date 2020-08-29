import React from 'react';
import { View, Image } from 'react-native';
import s from '../css/styles';
import { Text, Button } from 'react-native-elements';
import Phrase from '../components/Phrase';
import CardsGrid from '../components/CardsGrid';

const HomeScreen = ({navigation}) => {
    return (
        <View>
            <Phrase />
            <CardsGrid />
            
            <Text style={s.text}> HomeScreen </Text>
            <Button title='Create Card' onPress={() => navigation.navigate('CreateCard')} />
        </View>
    );
};



export default HomeScreen;