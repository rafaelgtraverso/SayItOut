import createDataContext from './createDataContext';
import { handleVoice } from '../helpers/tts/handleVoices';

const phraseReducer = (state, action) => {
    switch (action.type) {
        case 'assembling_phrase':
            return { 
                ...state,
                phrase: [...state.phrase, action.payload],
            };
        case 'delete_last':
            let del = state.phrase.pop();
            return {
                phrase: state.phrase,
            };
        case 'sql_phrases':
            let phrases= action.payload.reduce((r,{phrase_id: phrase_id, ...object})=>{
                let temp = r.find(object => object.phrase_id === phrase_id);
                if(!temp) r.push(temp = {phrase_id, phraseString:' ', data:[]});
                temp.data.push(object);
                temp.phraseString += object.name+' '
                return r;
              },[]);
            return {
                ...state,
                savedPhrases: phrases,
            };
        case 'clear_phrase':
            return {
                ...state,
                phrase:[],
            };
        case 'set_phrase_id':
            return {
                ...state,
                phraseId: action.payload,
            };
        default:
            return state;
    }
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

const clearPhrase= dispatch => () =>{
    dispatch({ type: 'clear_phrase'});
};

const setLastPhraseId = dispatch => (lastPhraseId) => {
    dispatch({ type: 'set_phrase_id', payload: lastPhraseId});
};

export const { Context, Provider } = createDataContext(
    phraseReducer,
    { showPhrase, deleteLastEntry, sqlPhrases, clearPhrase, setLastPhraseId },
    { phrase: [], savedPhrases:[], phraseId: 0}
);
