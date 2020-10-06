import React, { useContext } from 'react';
import {View} from 'react-native';
import s from '../css/styles';
import Phrase from '../components/Phrase';
import CardsGrid from '../components/CardsGrid';
import {Context as PhraseContext} from '../context/PhraseContext';
import { NavigationEvents } from 'react-navigation';


const HomeScreen = () => {
  const {clearPhrase} = useContext(PhraseContext);
  return (
    <View >
      <NavigationEvents onDidFocus={clearPhrase} />
      <Phrase style={s.phraseInput} />
      <CardsGrid style={s.cardsGridview} />
    </View>
  );
};

export default HomeScreen;
