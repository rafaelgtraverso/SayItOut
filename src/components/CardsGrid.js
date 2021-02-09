import React, { useState, useEffect } from 'react';
import { View, FlatList, Dimensions, TouchableOpacity } from 'react-native';
import s from '../css/styles';
import Card from '../components/Card';
import { getCards } from '../api/local/sqlite';
import { t } from '../helpers/i18n'
import { showPhrase } from '../actions/phrases';
import { connect } from 'react-redux';
import { handleVoice } from '../helpers/tts/handleVoices';
import PropTypes from 'prop-types';

const columnWidth = width => {
  return parseInt(width / (s.image.width + 10), 10)
}

const CardsGrid = props => {
  const screenWidth = Dimensions.get('window').width;

  const [column, setColumn] = useState(columnWidth(screenWidth));

  const onLayout = e => {
    const { width } = e.nativeEvent.layout;
    setColumn(columnWidth(width));
  };

  const [dataSql,setDataSql]=useState([]);
  useEffect(()=>{
    const cb = cards => setDataSql(cards);
    getCards({ cb });
  },[]);

  return (
    <View onLayout={onLayout} style={s.cardsGridview}>
      <FlatList
        data={dataSql}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => props.show_phrase(item)}>
            <Card item={item}/>
          </TouchableOpacity>
        )}
        keyExtractor={(item, index) => item.name + index.toString()}
        numColumns={column}
        key={column}
      />
    </View>
  );
};

CardsGrid.propTypes = {
  show_phrase: PropTypes.func
};

const mapStateToProps = state => {
  return {
    phrases: state.phraseReducer
  }
};

const mapDispatchToProps = dispatch => {
  return {
    show_phrase: item => {
      handleVoice(t[item.name]);
      dispatch(showPhrase(item));
    }
  }
};

export default connect(mapStateToProps,mapDispatchToProps)(CardsGrid);