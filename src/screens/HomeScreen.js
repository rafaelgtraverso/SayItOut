import React, {useEffect,useState} from 'react';
import { View } from 'react-native';
import Phrase from '../components/Phrase';
import CardsGrid from '../components/CardsGrid';
import { connect } from 'react-redux';
import { clearPhrase } from '../actions/phrases';
import { setCategory } from '../actions/cards'
import PropTypes from 'prop-types';
import { getCategories } from '../api/local/sqlite';
import { navigate } from '../navigationRef';


const HomeScreen = props => {
  const { display_categories } = props;

  const [dataSql,setDataSql]=useState([]);
  useEffect(()=>{
    const cb = categories => setDataSql(categories);
    getCategories({ cb });
  },[]);

  return (
    <View >
      <Phrase />
      <CardsGrid
        data={dataSql}
        on_Press={display_categories}
      />
    </View>
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
        navigate('Cards');
      }
    },
  }
};

export default connect(mapStateToProps,mapDispatchToProps)(HomeScreen);
