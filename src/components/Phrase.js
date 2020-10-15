import React,{ useContext,useEffect } from 'react';
import { Icon } from 'react-native-elements';
import { View, ScrollView, TouchableOpacity } from 'react-native';
import s from '../css/styles';
import {Context as PhraseContext} from '../context/PhraseContext';
import {Context as AuthContext } from '../context/AuthContext';
import Card from '../components/Card';
import { getPhrasesCount, insertPhrase } from '../api/local/sqlite';
import { handleVoice } from '../helpers/tts/handleVoices';
import * as RNLocalize from 'react-native-localize';


const Phrase = () => {
    const {state, deleteLastEntry, clearPhrase, setLastPhraseId} = useContext(PhraseContext);
    const {state:{email}} = useContext(AuthContext);

    useEffect(() =>{
        const cb = (phraseId) => setLastPhraseId(phraseId[0].Last_Id+1); 
        getPhrasesCount({cb});
    },[state.phrase]);
    const savePhrase = () => {
        if (state.phraseId>0){
            insertPhrase(state.phraseId,state.phrase, email);
            clearPhrase();
        }else{
            console.log(state); 
        }
        
    } ;
    const phraseToVoice = () => {
        let phoneLanguage = RNLocalize.getLocales()[0].languageCode
        let phrase2Voice = ''
        state.phrase.forEach( e => {phoneLanguage=='it' ? phrase2Voice += ' ' + e.name_it : phrase2Voice += ' ' +e.name})
        return phrase2Voice;
    };

    return (
        <View style={s.phraseInputView} >
            <ScrollView 
                style={s.phraseInput} 
                horizontal={true} 
                ref={ref => this.scrollView = ref}
                onContentSizeChange={() => this.scrollView.scrollToEnd()}
            >
                { state.phrase.length!= 0 
                    ? (
                        state.phrase.map(element => {
                            return <Card key={Math.random(9999).toString()} item={element} />
                        })
                    ) : null }
            </ScrollView>
            <View style={s.phraseButtons}>
                <TouchableOpacity onPress={deleteLastEntry}  >
                    <Icon
                        name='delete'
                        type='feather'
                        size={50}
                        color='black'
                        
                    />
                </TouchableOpacity>
                <TouchableOpacity onPress={()=> handleVoice(phraseToVoice())}  >
                    <Icon
                        name='play-circle'
                        type='feather'
                        size={50}
                        color='green'
                        
                    />
                </TouchableOpacity>
                <TouchableOpacity onPress={savePhrase} >
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
