import { ASSEMBLING_PHRASE, DELETE_LAST_CARD, SQL_PHRASE, CLEAR_PHRASE, SET_PHRASE_ID } from '../actions/types';
import { t } from '../helpers/i18n'

const inialState = {
    phrase: [],
    savedPhrases:[],
    phraseId: 0
};
const phraseReducer = (state = inialState, action) => {
    switch (action.type) {
        case ASSEMBLING_PHRASE:
            return {
                ...state,
                phrase: [...state.phrase, action.payload],
            };
        case DELETE_LAST_CARD:
            state.phrase.pop();
            return {
                phrase: state.phrase,
            };
        case SQL_PHRASE:{
            let phrases = action.payload.sqlPhrases.reduce((r,{ phrase_id: phrase_id, ...object })=>{
                let temp = r.find(object => object.phrase_id === phrase_id);
                if(!temp) r.push(temp = { phrase_id, phraseString:' ', data:[] });
                temp.data.push(object);
                temp.phraseString += `${t[object.name]} `;
                return r;
              },[]);
            return {
                ...state,
                savedPhrases: phrases,
            };
        }
        case CLEAR_PHRASE:
            return {
                ...state,
                phrase:[],
            };
        case SET_PHRASE_ID:
            return {
                ...state,
                phraseId: action.payload,
            };
        default:
            return state;
    }
};

export default phraseReducer;