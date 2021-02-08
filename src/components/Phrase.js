import React,{ useEffect } from 'react';
import { Icon } from 'react-native-elements';
import { View, ScrollView, TouchableOpacity } from 'react-native';
import s from '../css/styles';
import Card from '../components/Card';
import { getPhrasesCount, insertPhrase } from '../api/local/sqlite';
import { handleVoice } from '../helpers/tts/handleVoices';
import { t } from '../helpers/i18n'
import { connect } from 'react-redux';
import { deleteLastEntry, clearPhrase, setLastPhraseId, showPhrase } from '../actions/phrases';
import PropTypes from 'prop-types';

const Phrase = props => {
    const { auths, phrases, clear_phrase } = props;
    const { phraseId, phrase } = phrases;
    const { email } = auths;

    useEffect(() =>{
        const cb = phraseId => props.set_last_phrase_id(phraseId[0].Last_Id + 1);
        getPhrasesCount({ cb });
    }, [phrase]);

    const savePhrase = () => {
        try{
            if (phraseId > 0){
                insertPhrase(phraseId, phrase, email);
                clear_phrase();
            }
        }catch (err){
            console.log(err);
        }

    } ;
    const phraseToVoice = () => {
        const { phrase } = props.phrases;
        let phrase2Voice = ''
        phrase.map(item => phrase2Voice += ` ${t[item.name]}`)
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
                {
                    phrase.length != 0
                        ? phrase.map(element => {
                            return <Card key={Math.random(9999).toString()} item={element} />
                        })
                    : null
                }
            </ScrollView>
            <View style={s.phraseButtons}>
                <TouchableOpacity onPress={()=>props.delete_last_entry()} >
                    <Icon name='delete' type='feather' size={50} color='black' />
                </TouchableOpacity>
                <TouchableOpacity onPress={()=> handleVoice(phraseToVoice())}  >
                    <Icon name='play-circle' type='feather' size={50} color='green' />
                </TouchableOpacity>
                <TouchableOpacity onPress={savePhrase} >
                    <Icon name='save' type='feather' size={50} color='black' />
                </TouchableOpacity>
            </View>
        </View>
    )
};

Phrase.propTypes = {
    show_phrase: PropTypes.func,
    delete_last_entry: PropTypes.func,
    clear_phrase: PropTypes.func,
    set_last_phrase_id: PropTypes.func,
    phrases: PropTypes.object,
    auths: PropTypes.object
  };

const mapStateToProps = state => {
    const { phraseReducer, authReducer } = state;
    return {
     phrases: phraseReducer,
     auths: authReducer
   }
  };

  const mapDispatchToProps = dispatch => {
    return{
        show_phrase:  item => dispatch(showPhrase(item)),
        delete_last_entry: () => dispatch(deleteLastEntry()),
        clear_phrase: () => dispatch(clearPhrase()),
        set_last_phrase_id: lastPhraseId => dispatch(setLastPhraseId(lastPhraseId)),
    }
  };

  export default connect(mapStateToProps,mapDispatchToProps)(Phrase);
