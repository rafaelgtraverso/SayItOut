import React, { useState } from 'react';
import { SafeAreaView, FlatList, Dimensions, TouchableOpacity } from 'react-native';
import s from '../css/styles';
import Card from '../components/Card';
import { connect } from 'react-redux';
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
    <SafeAreaView onLayout={onLayout} style={s.cardsGridview}>
      <FlatList
        data={data}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => on_Press(item)}>
            <Card item={item} />
          </TouchableOpacity>
        )}
        keyExtractor={(item, index) => item.name + index.toString()}
        numColumns={column}
        key={column}
        contentContainerStyle={s.flatList}
      />
    </SafeAreaView>
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


export default connect(mapStateToProps)(CardsGrid);