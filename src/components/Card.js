import React from 'react';
import {View, Image} from 'react-native';
import s from '../css/styles';
import {Text} from 'react-native-elements';

const Card = ({item}) => {
    // console.log(item.name);
    let cardName = item.name;
    // console.log(cardName);
    // let url=require(item.url);
    // console.log(url); 
    return (
        <View style={s.cardContainer}>
            <Image
                style={s.image}
                source={item.url}
            />
            <Text style={s.textFlatList}>{cardName}</Text>
        </View>
    )
};

export default Card;
