import React, { useEffect, useState } from 'react';
import Phrase from '../components/Phrase';
import CardsGrid from '../components/CardsGrid';
import { getCards } from '../api/local/sqlite'
import { connect } from 'react-redux';
import { showPhrase } from '../actions/phrases';
import PropTypes from 'prop-types';
import { handleVoice } from '../helpers/tts/handleVoices';
import { t } from '../helpers/i18n'
import {
  Container,
  Header,
  Left,
  Button,
  Icon,
  Body,
  Title,
  Right
} from 'native-base';
import { navigate } from '../navigationRef';
import s from '../css/styles';
import Spacer from '../components/Spacer';


const CardsScreen = props => {
  const { cards: { cat_name }, show_phrase } = props;

  const [dataSql,setDataSql]=useState([]);
  useEffect(()=>{
    const cb = cards_cat => setDataSql(cards_cat);
    getCards({ cb, cat_name });
  },[]);

  return (
    <Container >
      <Header>
          <Left>
            <Button transparent onPress={()=>navigate('Home')}>
              <Icon name='arrow-back' />
            </Button>
          </Left>
          <Body>
            <Title style={s.headerContent}>{cat_name}</Title>
          </Body>
          <Right/>
        </Header>
        <Spacer/>
        <Phrase />
        <CardsGrid
          data={dataSql}
          on_Press = {show_phrase}
        />
    </Container>
  );
};

CardsScreen.propTypes = {
  show_phrase: PropTypes.func,
  phrases: PropTypes.object,
  cat_name: PropTypes.string,
  cards: PropTypes.object,
};


const mapStateToProps = (state) => {
  return {
   phrases:state.phraseReducer,
   cards:state.cardsReducer
 }
};

const mapDispatchToProps = (dispatch) => {
  return{
    show_phrase: item => {
      dispatch(showPhrase(item));
      handleVoice(t[item.name]);
    },
  }
};

export default connect(mapStateToProps,mapDispatchToProps)(CardsScreen);
