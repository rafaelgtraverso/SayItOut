import React, { useEffect} from 'react';
import {View} from 'react-native';
import s from '../css/styles';
import Phrase from '../components/Phrase';
import CardsGrid from '../components/CardsGrid';
import createDatabase from '../api/local/sqlite';

const HomeScreen = ({navigation}) => {
  useEffect(() => {
    createDatabase();
  },[]);
  return (
    <View style={{flex: 1}}>
      <Phrase style={s.phraseInput} />
      <CardsGrid style={s.cardsGridview} />
      {/* <Button title='Create Card' onPress={() => navigation.navigate('CreateCard')} /> */}
    </View>
  );
};

export default HomeScreen;
