import React, { useContext } from 'react';
import { View, Image } from 'react-native';
import s from '../css/styles';
import { Text, Button } from 'react-native-elements';
import Phrase from '../components/Phrase';
import CardsGrid from '../components/CardsGrid';
import { Context as PhraseContext } from '../context/PhraseContext'

const HomeScreen = ({navigation}) => {
    const {state} = useContext(PhraseContext);
    console.log(state)
    return (
        <View style={{flex:1}}>
            <Phrase 
                style={s.phraseInput} 
                // value={state}
            />
            <CardsGrid style={s.cardsGridview} />
            {/* <Button title='Create Card' onPress={() => navigation.navigate('CreateCard')} /> */}
        </View>
    );
};



export default HomeScreen;