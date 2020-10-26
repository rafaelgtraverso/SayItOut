import React,{ useEffect } from 'react';
import { Icon } from 'react-native-elements';
import { View, ScrollView, TouchableOpacity } from 'react-native';
import s from '../css/styles';
import Card from '../components/Card';
import { getPhrasesCount, insertPhrase } from '../api/local/sqlite';
import { handleVoice } from '../helpers/tts/handleVoices';
import * as RNLocalize from 'react-native-localize';
import {connect} from 'react-redux';
import { deleteLastEntry, clearPhrase, setLastPhraseId } from '../actions/phrases';

const Phrase = (props) => {
    useEffect(() =>{
        const cb = (phraseId) => props.set_last_phrase_id(phraseId[0].Last_Id+1); 
        getPhrasesCount({cb});
    },[props.phrases.phrase]);

    const savePhrase = () => {
        if (props.phrases.phraseId>0){
            insertPhrase(props.phrases.phraseId,props.phrases.phrase, props.auths.email);
            props.clear_phrase();
        }else{
            console.log(props.phrases); 
        }
        
    } ;
    const phraseToVoice = () => {
        let phoneLanguage = RNLocalize.getLocales()[0].languageCode
        let phrase2Voice = ''
        props.phrases.phrase.forEach( e => {phoneLanguage=='it' ? phrase2Voice += ' ' + e.name_it : phrase2Voice += ' ' +e.name})
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
                { props.phrases.phrase.length!= 0 
                    ? ( 
                        props.phrases.phrase.map(element => {
                            return <Card key={Math.random(9999).toString()} item={element} />
                        })
                    ) : null }
            </ScrollView>
            <View style={s.phraseButtons}>
                <TouchableOpacity onPress={()=>props.delete_last_entry()} >
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


const mapStateToProps = (state) => {
    return {
     phrases:state.phraseReducer,
     auths:state.authReducer
   }
  };
  
  const mapDispatchToProps = (dispatch) => {
    return{
        show_phrase:  (item) => dispatch(showPhrase(item)),
        delete_last_entry: () => dispatch(deleteLastEntry()),
        clear_phrase: () => dispatch(clearPhrase()), 
        set_last_phrase_id: (lastPhraseId) => dispatch(setLastPhraseId(lastPhraseId)),
    }
  };
  
  export default connect(mapStateToProps,mapDispatchToProps)(Phrase);
