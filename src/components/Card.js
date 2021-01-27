import React from 'react';
import { View, Image } from 'react-native';
import s from '../css/styles';
import { Text } from 'react-native-elements';
import * as RNLocalize from 'react-native-localize';

const Card = params => {
    const { item } = params;
    let locale = RNLocalize.getLocales()[0].languageCode;
    const name = item.name.replace(/_/g, ' ');

    return (
        <View style={s.cardContainer}>
            <Image
                style={s.image}
                source={item.url}
            />
            <Text style={s.textFlatList}>{locale=='it' ? item.name_it : name }</Text>
        </View>
    )
};

export default Card;
