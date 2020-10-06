import React, { useContext, useEffect } from 'react';
import {SafeAreaView, FlatList, TouchableOpacity, View} from 'react-native';
import s from '../css/styles';
import {Text, Icon} from 'react-native-elements';
import { getAllPhrases, removePhrase } from '../api/local/sqlite';
import { Context as PhraseContext } from '../context/PhraseContext';
import { Context as AuthContext } from '../context/AuthContext';
import Card from '../components/Card';
import { handleVoice } from '../helpers/tts/handleVoices';
import * as RNLocalize from 'react-native-localize';



const PhraseListScreen = () => {
  const { state, sqlPhrases } = useContext(PhraseContext);
  const {state:{email}} = useContext(AuthContext);
  const phoneLanguage = RNLocalize.getLocales()[0].languageCode;
  const cb = (phrases) => sqlPhrases(phrases, phoneLanguage);
  useEffect(()=>{
    getAllPhrases({cb, email});
  },[state.phraseId]);

  const deletePhrase = (item) => {
    removePhrase(item.phrase_id);
    getAllPhrases({cb,email});
  };
  
  
  const renderCard = ({item}) => {
    return (
      <Card 
        key={(item.card_position).toString()+'-'+item.name}
        item={item}
        />
    )
  }
  const renderPhrase = ({item}) => {
    return (
      <View style={s.phraseView}>
        <FlatList 
          horizontal
          data={item.data}
          renderItem={renderCard}
          keyExtractor={(item) => item.name+Math.random(9999).toString()}
        />
        <TouchableOpacity onPress={()=>handleVoice(item.phraseString)}>
          <Icon
            name='play-circle'
            type='feather'
            size={50}
            color='black'
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>deletePhrase(item)}>
          <Icon
            name='trash-2'
            type='feather'
            size={50}
            color='red'
          />
        </TouchableOpacity>
       </View>
    )
  };
  return (
    <SafeAreaView forceInset={{top: 'always'}} >
      <Text style={s.text}> Saved Phrases </Text>
      <View >
        <FlatList 
          style={s.phraseListView}
          data={state.savedPhrases}
          renderItem={renderPhrase}
          keyExtractor={item =>item.phrase_id.toString()}
        />
      </View>
    </SafeAreaView>
  );
};

export default PhraseListScreen;
