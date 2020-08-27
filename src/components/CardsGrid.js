import React from 'react';
import { SafeAreaView } from 'react-native';
import s from '../css/styles';
import { Text, Image } from 'react-native-elements';
import Acorn from '../assets/cards/acorn.svg'
// import * as RNFS from 'react-native-fs';

const CardsGrid = () => {
  
    return (
        <SafeAreaView style={s.cardsGridview} >
            <Acorn width={200} height={200} />
            <Text> Cards</Text>
        </SafeAreaView>
    )
};

export default CardsGrid;