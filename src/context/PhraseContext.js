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
            state.phrase.pop();
            return {
                phrase: state.phrase,
            };
        case 'sql_phrases':{
            let phrases = action.payload.sqlPhrases.reduce((r,{ phrase_id: phrase_id, ...object })=>{
                let temp = r.find(object => object.phrase_id === phrase_id);
                if(!temp) r.push(temp = { phrase_id, phraseString:' ', data:[] });
                temp.data.push(object);
                if (action.payload.phoneLanguage == 'it') {
                    temp.phraseString += object.name_it+' ';
                }else{
                    temp.phraseString += object.name+' ';
                }
                return r;
              },[]);
            return {
                ...state,
                savedPhrases: phrases,
            };
        }
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



const showPhrase = dispatch => (item, phoneLanguage) => {
    dispatch({ type:'assembling_phrase', payload: item });
    if(phoneLanguage=='it'){
        handleVoice(item.name_it);
    }else {
        handleVoice(item.name)
    }

};

const deleteLastEntry = dispatch => () => {
        dispatch({ type: 'delete_last' });
};

const sqlPhrases = dispatch => (sqlPhrases, phoneLanguage) => {
    dispatch({ type: 'sql_phrases', payload: { sqlPhrases, phoneLanguage } });
};

const clearPhrase= dispatch => () =>{
    dispatch({ type: 'clear_phrase' });
};

const setLastPhraseId = dispatch => (lastPhraseId) => {
    dispatch({ type: 'set_phrase_id', payload: lastPhraseId });
};

export const { Context, Provider } = createDataContext(
    phraseReducer,
    { showPhrase, deleteLastEntry, sqlPhrases, clearPhrase, setLastPhraseId },
    { phrase: [], savedPhrases:[], phraseId: 0 }
);
