import React, { useState } from 'react';
import { View, FlatList, Dimensions, TouchableOpacity } from 'react-native';
import s from '../css/styles';
import Card from '../components/Card';
import { t } from '../helpers/i18n'
import { showPhrase } from '../actions/phrases';
import { connect } from 'react-redux';
import { handleVoice } from '../helpers/tts/handleVoices';
import PropTypes from 'prop-types';

const CardsGrid = props => {
  const screenWidth = Dimensions.get('window').width;

  const [column, setColumn] = useState(
    parseInt(screenWidth / (s.image.width + 10), 10),
  );

  const onLayout = (event) => {
    setColumn(
      parseInt(event.nativeEvent.layout.width / (s.image.width + 10), 10),
    );
  };

  return (
    <View onLayout={onLayout} style={s.cardsGridview}>
      <FlatList
        data={Object.keys(t).splice(0, 10)}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => props.show_phrase(item)}>
            <Card item={item} />
          </TouchableOpacity>
        )}
        keyExtractor={(item,index) => item.name+index.toString()}
        numColumns={column}
        key={column}
      />
    </View>
  );
};

CardsGrid.propTypes = {
  show_phrase: PropTypes.func
};

const mapStateToProps = (state) => {
  return {
   phrases:state.phraseReducer
 }
};

const mapDispatchToProps = (dispatch) => {
  return{
    show_phrase: item => {
      dispatch(showPhrase(item));
      handleVoice(t[item]);
    }
  }
};

export default connect(mapStateToProps,mapDispatchToProps)(CardsGrid);