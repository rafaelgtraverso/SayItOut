import React from 'react';
import {View, Image} from 'react-native';
import s from '../css/styles';
import {Text} from 'react-native-elements';

const Card = ({item}) => {
  return (
    <View style={s.cardContainer}>
      <Image style={s.image} source={item.url} />
      <Text style={s.textFlatList}>{item.name}</Text>
    </View>
  );
};

export default Card;
