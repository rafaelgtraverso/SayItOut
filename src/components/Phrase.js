import React,{ useContext,useEffect } from 'react';
import { Icon } from 'react-native-elements';
import { View, ScrollView, TouchableOpacity } from 'react-native';
import s from '../css/styles';
import {Context as PhraseContext} from '../context/PhraseContext';
import Card from '../components/Card';
import {Data} from '../assets/cardsPng/index';
import { getPhrasesCount, insertPhrase } from '../api/local/sqlite';
import { NavigationEvents } from 'react-navigation';
import { handleVoice } from '../helpers/tts/handleVoices';


const Phrase = () => {
    const {state, deleteLastEntry, clearPhrase, setLastPhraseId} = useContext(PhraseContext);
    console.log(state.phraseId);
    useEffect(() =>{
        const cb = (phraseId) => setLastPhraseId(phraseId[0].Last_Id+1); //{phraseId[0].Last_Id!=null ? setLastPhraseId(phraseId[0].Last_Id+1) : setLastPhraseId(1)}; 
        getPhrasesCount({cb});
    },[state.phrase]);
    const savePhrase = () => {
        // setPhraseId();
        // // console.log(state.phrase);
        if (state.phraseId>0){
            insertPhrase(state.phraseId,state.phrase);
            clearPhrase();
        }else{
            console.log(state);
        }
        
    } ;

    return (
        <View style={s.phraseInputView} >
            {/* <NavigationEvents onWillBlur={clearPhrase} /> */}
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
                <TouchableOpacity onPress={()=>handleVoice(state.phrase.toString(' '))}>
                    <Icon
                        name='play-circle'
                        type='feather'
                        size={50}
                        color='green'
                    />
                </TouchableOpacity>
                <TouchableOpacity onPress={savePhrase}>
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
