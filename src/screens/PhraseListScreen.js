import React, { useEffect } from 'react';
import { FlatList, View } from 'react-native';
import s, { colors } from '../css/styles';
import {
  Icon,
  Button,
  Container,
  Left,
  Body,
  Header,
  Title,
  Right,
  Text
} from 'native-base'
import {
  getAllPhrases,
  removePhrase
} from '../api/local/sqlite';
import Card from '../components/Card';
import { handleVoice } from '../helpers/tts/handleVoices';
import * as RNLocalize from 'react-native-localize';
import { connect } from 'react-redux';
import { sqlPhrases } from '../actions/phrases';
import PropTypes from 'prop-types';
import { SafeAreaView } from 'react-native';

const PhraseListScreen = props => {
  const { phrases:{ savedPhrases, phraseId }, auths: { token },sql_phrases } = props
  const locale = RNLocalize.getLocales()[0].languageCode;
  const cb = (phrases) => sql_phrases(phrases, locale);
  useEffect(()=>{
    getAllPhrases({ cb, token });
  },[phraseId]);

  const deletePhrase = (item) => {
    removePhrase(item.phrase_id);
    getAllPhrases({ cb,token });
  };

  const renderCard = ({ item }) => {
    return (
      <Card
        key={(item.card_position).toString()+'-'+item.name}
        item={item}
        />
    )
  }

  const renderPhrase = ({ item }) => {
    return (
      <View style={s.phraseView}>
        <FlatList
          horizontal
          data={item.data}
          renderItem={renderCard}
          keyExtractor={(item) => item.name+Math.random(9999).toString()}
        />
        <View style={s.phraseButtonsView}>
          <Button transparent large onPress={()=>handleVoice(item.phraseString)}>
            <Icon style={s.buttons} name='play-circle-outline'/>
          </Button>
          <Button transparent large onPress={()=>deletePhrase(item)}>
            <Icon style={[s.buttons,{ color: colors.red }]}
              name='trash-outline'
            />
          </Button>
        </View>
       </View>
    )
  };

  return (
    <Container>
      <Header transparent>
        <Left style={s.headerAndroid}/>
        <Body  style={s.headerAndroid}>
          <Title><Text style={s.headerContent}>Phrases</Text></Title>
        </Body>
        <Right  style={s.headerAndroid}/>
      </Header>
      <SafeAreaView style={s.container}>
        <FlatList
          data={savedPhrases}
          renderItem={renderPhrase}
          keyExtractor={item =>item.phrase_id.toString()}
        />
      </SafeAreaView>
          </Container>
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
      sql_phrases:  (phrases, locale) => dispatch(sqlPhrases(phrases, locale)),
  }
};

export default connect(mapStateToProps,mapDispatchToProps)(PhraseListScreen);
