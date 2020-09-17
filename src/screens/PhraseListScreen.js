import React, { useContext, useEffect } from 'react';
import {SafeAreaView, FlatList} from 'react-navigation';
import s from '../css/styles';
import {Text} from 'react-native-elements';
import { getAllPhrases } from '../api/local/sqlite';
import { Context as PhraseContext } from '../context/PhraseContext';


const PhraseListScreen = () => {
  const { state, sqlPhrases } = useContext(PhraseContext);
  const cb = (phrases) => sqlPhrases(phrases);
  useEffect(() => {
    getAllPhrases({cb})
  },
  []);
  console.log(state.savedPhrases);
  return (
    <SafeAreaView forceInset={{top: 'always'}}>
      <Text style={s.text}> Phrases </Text>
      <FlatList 
        data={state.savedPhrases}
        renderItem={({item}) => <Text>{item.phrase}</Text>}
        keyExtractor={item =>item.phrase}
      />
      
    </SafeAreaView>
  );
};


export default PhraseListScreen;
