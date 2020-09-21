import React, { useContext, useEffect } from 'react';
import {SafeAreaView, FlatList, TouchableOpacity} from 'react-native';
import s from '../css/styles';
import {Text, Icon} from 'react-native-elements';
import { getAllPhrases } from '../api/local/sqlite';
import { Context as PhraseContext } from '../context/PhraseContext';
import { View } from 'react-native';
import Card from '../components/Card';
import { handleVoice } from '../helpers/tts/handleVoices';



const PhraseListScreen = () => {
  const { state, sqlPhrases } = useContext(PhraseContext);

  const cb = (phrases) => sqlPhrases(phrases);
 useEffect(()=>{
  getAllPhrases({cb});
 },[state.phraseId])
  

  const renderCard = ({item}) => {
    // console.log(item);
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
          keyExtractor={(item) => item.name}
        />
        <TouchableOpacity onPress={()=>handleVoice(item.phraseString)}>
          <Icon
            name='play-circle'
            type='feather'
            size={50}
            color='black'
          />
        </TouchableOpacity>
        
       </View>
    )
  };
  return (
    <SafeAreaView forceInset={{top: 'always'}} >
      <Text style={s.text}> Phrases </Text>
      <View >
        <FlatList 
          data={state.savedPhrases}
          renderItem={renderPhrase}
          keyExtractor={item =>item.phrase_id.toString()}
        />
         
      </View>
    </SafeAreaView>
  );
};

export default PhraseListScreen;
