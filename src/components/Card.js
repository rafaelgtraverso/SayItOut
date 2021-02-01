import React from 'react';
import { View, Image } from 'react-native';
import s from '../css/styles';
import { Text } from 'react-native-elements';
import { t } from '../helpers/i18n'
import { Data } from '../assets/pecsCards/index2';


const Card = params => {
    const { item } = params;

    // TODO: get rid of this line by creating tranlation files right.
    const name = item.replace(/_/g, ' ');

    return (
        <View style={s.cardContainer}>
            <Image
                style={s.image}
                source={Data[item]}
            />
            <Text style={s.textFlatList}>{t[name]}</Text>
        </View>
    )
};

export default Card;
