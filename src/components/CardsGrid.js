import React, { useState } from 'react';
import { View, FlatList, Dimensions, TouchableOpacity } from 'react-native';
import s from '../css/styles';
import Card from '../components/Card';
import { t } from '../helpers/i18n'
import { showPhrase } from '../actions/phrases';
import { connect } from 'react-redux';
import { handleVoice } from '../helpers/tts/handleVoices';
import PropTypes from 'prop-types';

const columnWidth = width => {
  return parseInt(width / (s.image.width + 10), 10)
}

const CardsGrid = props => {
  const { on_Press, data } = props
  const screenWidth = Dimensions.get('window').width;

  const [column, setColumn] = useState(columnWidth(screenWidth));

  const onLayout = e => {
    const { width } = e.nativeEvent.layout;
    setColumn(columnWidth(width));
  };

  return (
    <View onLayout={onLayout} style={s.cardsGridview}>
      <FlatList
        data={data}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => on_Press(item)}>
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
  show_phrase: PropTypes.func,
  on_Press: PropTypes.func,
  data: PropTypes.array
};

const mapStateToProps = state => {
  return {
    phrases: state.phraseReducer,
    cards: state.cardsReducer
  }
};

const mapDispatchToProps = dispatch => {
  return {
    show_phrase: item => {
      dispatch(showPhrase(item));
      handleVoice(t[item.name]);
    },
  }
};

export default connect(mapStateToProps,mapDispatchToProps)(CardsGrid);