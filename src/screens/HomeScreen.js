import React, { useContext } from 'react';
import {View} from 'react-native';
import Phrase from '../components/Phrase';
import CardsGrid from '../components/CardsGrid';
import {Context as PhraseContext} from '../context/PhraseContext';
import { NavigationEvents } from 'react-navigation';


const HomeScreen = () => {
  const {clearPhrase} = useContext(PhraseContext);
  return (
    <View >
      <NavigationEvents onDidFocus={clearPhrase} />
      <Phrase />
      <CardsGrid />
    </View>
  );
};

export default HomeScreen;
