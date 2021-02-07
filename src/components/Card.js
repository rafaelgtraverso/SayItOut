import React from 'react';
import { View, Image } from 'react-native';
import s from '../css/styles';
import { Text } from 'react-native-elements';
import { t } from '../helpers/i18n'


const Card = params => {
    const { item } = params;

    if (item) {
        // TODO: get rid of this line by creating tranlation files right.
        const name = item.name.replace(/_/g, ' ');

        return (
            <View style={s.cardContainer}>
                <Image
                    style={s.image}
                    source={item.url}
                />
                <Text style={s.textFlatList}>{t[name]}</Text>
            </View>
        )
    } else {
        return null
    }
};

export default Card;
