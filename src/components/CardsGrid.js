import React from 'react';
import { View, Image } from 'react-native';
import s from '../css/styles';
import { Text } from 'react-native-elements';

import * as RNFS from 'react-native-fs';

const CardsGrid = () => {
    // const cardsDir='/src/assets/cardsPng/'
    // RNFS.readdir(cardsDir,(err,files) => {
    //     files.forEach(file =>{
    //         console.log(file);
    //     });
    // });
  
    return (
        <View style={s.cardsGridview} >
        
            <Image  
                source={{uri:'src/assets/cardsPng/teddy bear.png'}}
                style={{ width: 200, height: 200 }}
            />

            <Text> Cards</Text>
        </View>
    )
};

export default CardsGrid;