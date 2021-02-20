import React from 'react';
import { View, Image } from 'react-native';
import s from '../css/styles';
import { Text } from 'react-native-elements';
import { t } from '../helpers/i18n';
import { imgData } from '../helpers/images/urls';

const Card = params => {
    const { item } = params;
    return item
        ? <View style={s.cardContainer}>
            <Image
                style={s.image}
                source={imgData[item.name]}
            />
            <Text style={s.textFlatList}>{t[item.name]}</Text>
        </View>
        : null
};

export default Card;
