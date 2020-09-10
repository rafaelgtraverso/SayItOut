import React,{ useContext } from 'react';
import { Input, Button, Icon, Text } from 'react-native-elements';
import { View, TouchableOpacity } from 'react-native';
import s from '../css/styles';
import {Context as PhraseContext} from '../context/PhraseContext';
import Card from '../components/Card';
import {Data} from '../assets/cardsPng/index';
import { insertPhrase } from '../api/local/sqlite';

const Phrase = () => {
    const {state, deleteLastEntry, savePhrase } = useContext(PhraseContext)
    return (
        <View style={s.phraseInputView} >
            <View style={s.phraseInput}>
                <Text>
                { state.phrase.length!= 0 
                ? (
                    state.phrase.map(element => {
                        let cardData= Data.find(d => d.name === element);
                        return <Card key={Math.random(9999).toString()} item={cardData} />
                    })
                ) : null }
                </Text>
            </View>
            <View style={s.phraseButtons}>
                <TouchableOpacity onPress={deleteLastEntry}>
                    <Icon
                        name='delete'
                        type='feather'
                        size={50}
                        color='black'
                    />
                </TouchableOpacity>
                <TouchableOpacity >
                    <Icon
                        name='save'
                        type='feather'
                        size={50}
                        color='black'
                    />
                </TouchableOpacity>
            </View>
        </View>
    )
};

export default Phrase;
