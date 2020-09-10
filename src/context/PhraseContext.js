import createDataContext from './createDataContext';
import Tts from 'react-native-tts';
import { insertPhrase } from '../api/local/sqlite';

const phraseReducer = (state, action) => {
    switch (action.type) {
        case 'show_phrase':
            return { 
                phrase: [...state.phrase, action.payload],
            };
        case 'delete_last':
            let del = state.phrase.pop();
            return {
                phrase: state.phrase,
            };
        default:
            return state;
    }
};

const handleVoice = ttsText => {
    Tts.addListener('tts-start', () => {});
    Tts.addListener('tts-finish', () => {});
    Tts.addListener('tts-cancel', () => {});
    Tts.speak(ttsText);
    // Tts.stop();
};

const showPhrase = dispatch => (cardName) => {
    dispatch({ type:'show_phrase', payload: cardName });
    handleVoice(cardName);
};

const deleteLastEntry = dispatch => () => {
        dispatch({ type: 'delete_last' });
};

// const savePhrase = (phrase) => {
//     let phraseString = phrase.join('-');
//     // insertPhrase(phraseString.join('-'));
//     console.log(phraseString);
// };

export const { Context, Provider } = createDataContext(
    phraseReducer,
    { showPhrase, deleteLastEntry },
    { phrase: [] }
);
