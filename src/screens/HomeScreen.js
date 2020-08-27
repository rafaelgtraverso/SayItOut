import React from 'react';
import { View, Image } from 'react-native';
import s from '../css/styles';
import { Text, Button } from 'react-native-elements';
import Phrase from '../components/Phrase';
import CardsGrid from '../components/CardsGrid';

const HomeScreen = ({navigation}) => {
    return (
        <View>
            <Phrase />
            <CardsGrid />
            
            <Text style={s.text}> HomeScreen </Text>
            <Image
                style = {{width: '100%', height: 200,resizeMode : 'contain' }}
                source = {{uri :'asset:/images/emoji.png'}}
            />
            <Button title='Create Card' onPress={() => navigation.navigate('CreateCard')} />
        </View>
    );
};



export default HomeScreen;