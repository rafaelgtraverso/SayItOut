import React from 'react';
import { View } from 'react-native';
import s from '../css/styles';
import { Text, Button } from 'react-native-elements';
import Phrase from '../components/Phrase';
import CardsGrid from '../components/CardsGrid';

const HomeScreen = ({navigation}) => {
    return (
        <>
            <Phrase />
            <CardsGrid />
            {/* <Button title='Create Card' onPress={() => navigation.navigate('CreateCard')} /> */}
        </>
    );
};



export default HomeScreen;