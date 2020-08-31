import AsyncStorage from '@react-native-community/async-storage';
import createDataContext from './createDataContext';
import api from '../api/sayItOut';
import { navigate } from '../navigationRef';

const phraseReducer = (state, action) => {
    switch (action.type) {
        case 'show_phrase':
            return { 
                ...state,
                phrase:action.payload,
            };
        default:
            return state;
    }
};


const showPhrase = dispatch => (cardName) => {

    dispatch({ type:'show_phrase', payload: cardName });
    // console.log(this.state);
    console.log(cardName);
    };

export const { Context, Provider } = createDataContext(
    phraseReducer,
    { showPhrase },
    {  phrase:[] }
);