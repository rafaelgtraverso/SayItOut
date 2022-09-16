import { ASSEMBLING_PHRASE, DELETE_LAST_CARD, SQL_PHRASE, CLEAR_PHRASE, SET_PHRASE_ID } from '../actions/types';

export const showPhrase = (item) => (
    {
        type:ASSEMBLING_PHRASE,
        payload: item
    }
);

export const deleteLastEntry = () => (
    { type: DELETE_LAST_CARD }
);

export const sqlPhrases = (sqlPhrases, locale) => (
    {
        type: SQL_PHRASE,
        payload: { sqlPhrases, locale }
    }
);


export const clearPhrase = () =>(
    {
        type: CLEAR_PHRASE
    }
);

export const setLastPhraseId = (lastPhraseId) => (
    {
        type: SET_PHRASE_ID,
        payload: lastPhraseId
    }
);