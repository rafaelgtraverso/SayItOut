import createDataContext from './createDataContext';
import Tts from 'react-native-tts';
import { insertPhrase } from '../api/local/sqlite';

const phraseReducer = (state, action) => {
    switch (action.type) {
        case 'assembling_phrase':
            return { 
                phrase: [...state.phrase, action.payload],
            };
        case 'delete_last':
            let del = state.phrase.pop();
            return {
                phrase: state.phrase,
            };
        case 'sql_phrases':
            return {
                ...state,
                savedPhrases: action.payload,
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
    dispatch({ type:'assembling_phrase', payload: cardName });
    handleVoice(cardName);
};

const deleteLastEntry = dispatch => () => {
        dispatch({ type: 'delete_last' });
};

const sqlPhrases = dispatch => (sqlPhrases) => {
    dispatch({type: 'sql_phrases', payload: sqlPhrases});
};

export const { Context, Provider } = createDataContext(
    phraseReducer,
    { showPhrase, deleteLastEntry, sqlPhrases },
    { phrase: [], savedPhrases:[] }
);
