import React from 'react';
import {View, Image} from 'react-native';
import s from '../css/styles';
import {Text} from 'react-native-elements';
import * as RNLocalize from 'react-native-localize';

const Card = ({item}) => {
    let phoneLanguage = RNLocalize.getLocales()[0].languageCode;
    // console.log(item.name);
    // let cardName = item.name.replace(/_/g, ' ');
    return (
        <View style={s.cardContainer}>
            <Image
                style={s.image}
                source={item.url}
            />
            <Text style={s.textFlatList}>{phoneLanguage=='it' ? item.name_it : item.name.replace(/_/g, ' ')}</Text>
        </View>
    )
};

export default Card;
