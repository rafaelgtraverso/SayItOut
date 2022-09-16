import React, { useState } from 'react';
import {
  FlatList,
  Dimensions,
  Image
} from 'react-native';
import s from '../css/styles';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { t } from '../helpers/i18n';
import { imgData } from '../helpers/images/urls';
import {
  Card,
  CardItem,
  Text
} from 'native-base';

const columnWidth = width => {
  return parseInt(width / (s.image.width + 20), 10)
}

const CardsGrid = props => {
  const { on_Press, data } = props

  const [column, setColumn] = useState();

  const onLayout = () => {
    const { width, height } = Dimensions.get('screen');
    if (width < height) setColumn(columnWidth(width)-1);
    if (width > height) setColumn(columnWidth(height)-1);
  };

  const renderCard = ({ item }) => {
    return (
      <Card style={s.cardContainer}>
        <CardItem style={s.cardItem} button onPress={() => on_Press(item)}>
          <Image
            style={s.image}
            source={imgData[item.name]}
            resizeMode='contain'
          />
        </CardItem >
        <CardItem style={s.cardItem} button onPress={() => on_Press(item)}>
          <Text style={s.textFlatList}>{t[item.name]}</Text>
        </CardItem>
      </Card>
    )
  };

  return (
    <>
      <FlatList
        onLayout={onLayout}
        data={data}
        renderItem={renderCard}
        keyExtractor={(item, index) => item.name + index.toString()}
        numColumns={column}
        key={column}
        contentContainerStyle={s.flatList}
      />
    </>
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