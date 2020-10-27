import React, { useEffect } from 'react';
import {SafeAreaView, FlatList, TouchableOpacity, View} from 'react-native';
import s from '../css/styles';
import {Text, Icon} from 'react-native-elements';
import { getAllPhrases, removePhrase } from '../api/local/sqlite';
import Card from '../components/Card';
import { handleVoice } from '../helpers/tts/handleVoices';
import * as RNLocalize from 'react-native-localize';
import {connect} from 'react-redux';
import { sqlPhrases } from '../actions/phrases';
import PropTypes from 'prop-types';

const PhraseListScreen = (props) => {
  const email = props.auths.email;
  const phoneLanguage = RNLocalize.getLocales()[0].languageCode;
  const cb = (phrases) => props.sql_phrases(phrases, phoneLanguage);
  useEffect(()=>{
    getAllPhrases({cb, email});
  },[props.phrases.phraseId]);

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
          data={props.phrases.savedPhrases}
          renderItem={renderPhrase}
          keyExtractor={item =>item.phrase_id.toString()}
        />
      </View>
    </SafeAreaView>
  );
};

PhraseListScreen.propTypes = {
  sql_phrases: PropTypes.func,
  phrases: PropTypes.object,
  auths: PropTypes.object
};

const mapStateToProps = (state) => {
  return {
   phrases:state.phraseReducer,
   auths:state.authReducer
 }
};

const mapDispatchToProps = (dispatch) => {
  return{
      sql_phrases:  (phrases, phoneLanguage) => dispatch(sqlPhrases(phrases, phoneLanguage)),
  }
};

export default connect(mapStateToProps,mapDispatchToProps)(PhraseListScreen);
