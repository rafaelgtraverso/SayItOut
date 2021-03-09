import React,
  {
  useEffect,
  useState
} from 'react';
import Phrase from '../components/Phrase';
import CardsGrid from '../components/CardsGrid';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { setCategory } from '../actions/cards';
import { clearPhrase } from '../actions/phrases';
import { getCategories } from '../api/local/sqlite';
import {
  Container,
  Header,
  Left,
  Body,
  Title,
  Right,
  Text
} from 'native-base';
import { View } from 'react-native'
import { navigate } from '../navigationRef';
import s from '../css/styles';
import Spacer from '../components/Spacer';

const HomeScreen = props => {
  const { display_categories } = props;

  const [dataSql,setDataSql]=useState([]);
  useEffect(()=>{
    const cb = categories => setDataSql(categories);
    getCategories({ cb });
  },[]);

  return (
    <Container>
      <Header transparent>
        <Left style={s.headerAndroid}/>
        <Body style={s.headerAndroid}>
          <Title><Text style={s.headerContent}>Categories</Text></Title>
        </Body>
        <Right style={s.headerAndroid}/>
      </Header>
      <Phrase />
      <Spacer/>
      <CardsGrid
        data={dataSql}
        on_Press={display_categories}
      />
    </Container>
  );
};

HomeScreen.propTypes = {
  clear_phrase: PropTypes.func,
  phrases: PropTypes.object,
  display_categories: PropTypes.func
};


const mapStateToProps = (state) => {
  return {
   cards:state.cardsReducer
 }
};

const mapDispatchToProps = (dispatch) => {
  return{
    clear_phrase: () => dispatch(clearPhrase()),
    display_categories: item =>{
      if(item.is_parent==1) {
        dispatch(setCategory(item.cat_name.trim()));
        navigate('Cards')
      }
    },
  }
};

export default connect(mapStateToProps,mapDispatchToProps)(HomeScreen);
