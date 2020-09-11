import React from 'react';
import {SafeAreaView} from 'react-navigation';
import s from '../css/styles';
import {Text} from 'react-native-elements';

const PhraseListScreen = () => {
  return (
    <SafeAreaView forceInset={{top: 'always'}}>
      <Text style={s.text}> PhraseListScreen </Text>
    </SafeAreaView>
  );
};

export default PhraseListScreen;
