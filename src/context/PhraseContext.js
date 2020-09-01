import AsyncStorage from '@react-native-community/async-storage';
import createDataContext from './createDataContext';
import api from '../api/sayItOut';
import { navigate } from '../navigationRef';

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
            }
        default:
            return state;
    }
};


const showPhrase = dispatch => (cardName) => {
    dispatch({ type:'show_phrase', payload: cardName });
    console.log(cardName);
    };

    const deleteLastEntry = dispatch => () => {
        dispatch({ type: 'delete_last' });
    };

export const { Context, Provider } = createDataContext(
    phraseReducer,
    { showPhrase, deleteLastEntry },
    {  phrase: [] }
);