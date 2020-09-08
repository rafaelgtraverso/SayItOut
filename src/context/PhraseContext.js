import AsyncStorage from '@react-native-community/async-storage';
import createDataContext from './createDataContext';
import api from '../api/remote/heroku';
import { navigate } from '../navigationRef';
// import Tts from 'react-native-tts';

const phraseReducer = (state, action) => {
    switch (action.type) {
        case 'show_phrase':
            // const voices = await Tts.voices();
            // const availableVoices = voices
            //         .filter(v => !v.networkConnectionRequired && !v.notInstalled)
            //         .map(v => { return { id: v.id, name: v.name, language: v.language };});
            // Tts
            return { 
                phrase: [...state.phrase, action.payload],
            };
        case 'delete_last':
            let del = state.phrase.pop();
            return {
                phrase: state.phrase,
            }
        default:
            return state;
    }
};

const showPhrase = dispatch => (cardName) => {
    // let cleanName = cardName.replace(/_/g, ' ');
    dispatch({ type:'show_phrase', payload: cardName });
    // Tts.speak(cleanName);
    // Tts.stop();
    // console.log(cardCleanName);
    };

    const deleteLastEntry = dispatch => () => {
        dispatch({ type: 'delete_last' });
    };

export const { Context, Provider } = createDataContext(
    phraseReducer,
    { showPhrase, deleteLastEntry },
    {   phrase: [], 
        // tts:{ 
        //     voices:[],
        //     ttsStatus: 'initializing',
        //     selectedVoice: null,
        //     speechRate:0.5,
        //     speechPitch: 1,
        //     text:''    
        // }
    }
);
