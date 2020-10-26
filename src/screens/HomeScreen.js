import React, { useContext } from 'react';
import {View} from 'react-native';
import Phrase from '../components/Phrase';
import CardsGrid from '../components/CardsGrid';
import {Context as PhraseContext} from '../context/PhraseContext';
import { NavigationEvents } from 'react-navigation';
import {connect} from 'react-redux';
import { clearPhrase } from '../actions/phrases';


const HomeScreen = (props) => {
  // const {clearPhrase} = useContext(PhraseContext);
  return (
    <View >
      <NavigationEvents onWillFocus={props.clear_phrase} />
      <Phrase />
      <CardsGrid />
    </View>
  );
};


const mapStateToProps = (state) => {
  return {
   phrases:state.phraseReducer
 }
};

const mapDispatchToProps = (dispatch) => {
  return{
    clear_phrase: () => dispatch(clearPhrase()), 
  }
};

export default connect(mapStateToProps,mapDispatchToProps)(HomeScreen);
