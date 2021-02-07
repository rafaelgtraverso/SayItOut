import React from 'react';
import { View, Image } from 'react-native';
import s from '../css/styles';
import { Text } from 'react-native-elements';
import { t } from '../helpers/i18n'


const Card = params => {
    const { item } = params;

    return item
        ? <View style={s.cardContainer}>
            <Image
                style={s.image}
                source={item.url}
            />
            <Text style={s.textFlatList}>{t[item.name]}</Text>
        </View>
        : null
};

export default Card;
