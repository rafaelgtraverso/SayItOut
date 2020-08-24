import AsyncStorage from '@react-native-community/async-storage';
import createDataContext from './createDataContext';
import api from '../api/sayItOut';
import { navigate } from '../navigationRef';

const initialState = {
    isLoading:true,
    token:null,
    errorMessage:''
};

const authReducer = (state=initialState, action) => {
    switch (action.type) {
        case 'add_error':
            return { 
                ...state,
                errorMessage: action.payload,
                isLoading: false
            };
        case 'signin':
            return { 
                ...state,
                errorMessage:'', 
                token: action.payload,
                isLoading: false
            };
      case 'signout':
            return { 
                ...state,
                errorMessage:'', 
                token: null, 
                isLoading: false
            };
      case 'clear_error_message':
            return { 
                ...state, 
                errorMessage: '', 
                isLoading:false
            };
        default:
            return state;
    }
};

const tryLocalSignIn = dispatch => async () => {
    const token = await AsyncStorage.getItem('token');
    
    if (token) {
        dispatch({ type: 'signin', payload: token});
        // navigate('Account');
    } else {
        // navigate('Sign Up');
    }
};

const clearErrorMessage = dispatch => () => {
        dispatch({ type: 'clear_error_message'});
    };


const signup = dispatch => async ({ email, password }) => {
    try {
        const response = await api.post('/signup', { email, password });
        await AsyncStorage.setItem('token', response.data.token);
        dispatch({ type: 'signin', payload: response.data.token});
        
        // navigate("Lets talk");
        
    } catch (err) {
        dispatch({ type:'add_error', payload: 'Something went wrong with the sign up'});
    }
};

const signin = (dispatch) => async ({ email, password }) => {
    try {
        const response =  await api.post('/signin', { email, password });
        await AsyncStorage.setItem('token', response.data.token);
        dispatch({ type: 'signin', payload: response.data.token});
        console.log(response.data.token);
        navigate('Lets talk');
    } catch (err) {
        dispatch({ type: 'add_error', payload: 'Please check your credentials'})
        
    }
};


const signout = dispatch => async () => {
    await AsyncStorage.removeItem('token');
    dispatch({ type:'signout' });
    navigate('Sign In');
    };

export const { Provider, Context } = createDataContext(
    authReducer,
    { signup, signin, signout, clearErrorMessage, tryLocalSignIn },
    { isLoading:true, token: null, errorMessage:'' }
);