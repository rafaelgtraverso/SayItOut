import React,{ useEffect } from 'react';
import { View, ScrollView } from 'react-native';
import s from '../css/styles';
import Card from '../components/Card';
import {
    getPhrasesCount,
    insertPhrase
} from '../api/local/sqlite';
import { handleVoice } from '../helpers/tts/handleVoices';
import { t } from '../helpers/i18n'
import { connect } from 'react-redux';
import {
    deleteLastEntry,
    clearPhrase,
    setLastPhraseId
} from '../actions/phrases';
import PropTypes from 'prop-types';
import {
    Item,
    Button,
    Icon
} from 'native-base';

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
        phrase.map(item => phrase2Voice += `${t[item.name]}`)
        return phrase2Voice;
    };
    return (
        <View style={s.phraseInputView} >
            <Item rounded >
                <ScrollView
                    style={s.phraseInput}
                    horizontal={true}
                    ref={ref => this.scrollView = ref}
                    onContentSizeChange={() => this.scrollView ? this.scrollView.scrollToEnd() : false}
                >
                    {
                        phrase.length != 0
                            ? phrase.map((item, index) => {
                                const key = index.toString();
                                return <Card key={key} item={item} />
                            })
                        : null
                    }
                </ScrollView>
            </Item>
            <View style={s.phraseButtons}>
                <Button  transparent large onPress={()=>props.delete_last_entry()} >
                    <Icon style={s.buttons} name='backspace-outline' />
                </Button>
                <Button transparent large onPress={()=> handleVoice(phraseToVoice())}  >
                    <Icon style={s.buttons} name='play-circle-outline'/>
                </Button>
                <Button transparent large onPress={savePhrase} >
                    <Icon style={s.buttons} name='save-outline'/>
                </Button>
            </View>
        </View>

    )
};

Phrase.propTypes = {
    delete_last_entry: PropTypes.func,
    clear_phrase: PropTypes.func,
    set_last_phrase_id: PropTypes.func,
    phrases: PropTypes.object,
    auths: PropTypes.object
  };

const mapStateToProps = state => {
    return {
     phrases: state.phraseReducer,
     auths: state.authReducer
   }
  };

  const mapDispatchToProps = dispatch => {
    return{
        delete_last_entry: () => dispatch(deleteLastEntry()),
        clear_phrase: () => dispatch(clearPhrase()),
        set_last_phrase_id: lastPhraseId => dispatch(setLastPhraseId(lastPhraseId)),
    }
  };

  export default connect(mapStateToProps,mapDispatchToProps)(Phrase);
