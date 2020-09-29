import React from 'react';
import {View} from 'react-native';
import s from '../css/styles';
import Phrase from '../components/Phrase';
import CardsGrid from '../components/CardsGrid';


const HomeScreen = () => {
  return (
    <View style={{flex: 1}}>
      <Phrase style={s.phraseInput} />
      <CardsGrid style={s.cardsGridview} />
    </View>
  );
};

export default HomeScreen;
