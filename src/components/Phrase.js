import React,{ useContext } from 'react';
import { Icon } from 'react-native-elements';
import { View, ScrollView, TouchableOpacity } from 'react-native';
import s from '../css/styles';
import {Context as PhraseContext} from '../context/PhraseContext';
import Card from '../components/Card';
import {Data} from '../assets/cardsPng/index';
import { insertPhrase } from '../api/local/sqlite';


const Phrase = () => {
    const {state, deleteLastEntry} = useContext(PhraseContext)
    return (
        <View style={s.phraseInputView} >
            <ScrollView 
                style={s.phraseInput} 
                horizontal={true} 
                showsHorizontalScrollIndicator={false}
                ref={ref => this.scrollView = ref}
                onContentSizeChange={() => this.scrollView.scrollToEnd()}
            >
                { state.phrase.length!= 0 
                    ? (
                        state.phrase.map(element => {
                            let cardData= Data.find(d => d.name === element);
                            return <Card key={Math.random(9999).toString()} item={cardData} />
                        })
                    ) : null }
            </ScrollView>
            <View style={s.phraseButtons}>
                <TouchableOpacity onPress={deleteLastEntry}>
                    <Icon
                        name='delete'
                        type='feather'
                        size={50}
                        color='black'
                    />
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>insertPhrase(state.phrase.join(' '))}>
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
