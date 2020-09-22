import React, { useEffect} from 'react';
import {View} from 'react-native';
import s from '../css/styles';
import Phrase from '../components/Phrase';
import CardsGrid from '../components/CardsGrid';
import {createDatabase, populateCardsTable, getCards} from '../api/local/sqlite';
import {Data} from '../assets/cardsPng/index';
import * as RNLocalize from 'react-native-localize';
// import translate from 'google-translate-api'

const HomeScreen = () => {
  // const translate = require('google-translate-api');
  console.log(RNLocalize.getLocales()[0].languageCode);

  // useEffect(() => {
  //   createDatabase();
  //   populateCardsTable();
  // },[]);

  return (
    <View style={{flex: 1}}>
      <Phrase style={s.phraseInput} />
      <CardsGrid style={s.cardsGridview} />
    </View>
  );
};

export default HomeScreen;
