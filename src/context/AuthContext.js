import AsyncStorage from '@react-native-community/async-storage';

import createDataContext from './createDataContext';
import api from '../api/remote/heroku';
import { navigate } from '../navigationRef';

const authReducer = (state, action) => {
  switch (action.type) {
    case 'add_error':
      return {
        ...state,
        errorMessage: action.payload,
      };
    case 'signin':
      return {
        errorMessage: '',
        token: action.payload.token,
        email: action.payload.email
      };
    case 'signout':
      return {
        ...state,
        errorMessage: '',
        token: null,
        email:'', 
      };
    case 'clear_error_message':
      return {
        ...state,
        errorMessage: '',
      };
    default:
      return state;
  }
};

const tryLocalSignIn = (dispatch) => async () => {
  const token = await AsyncStorage.getItem('token');
  const email = await AsyncStorage.getItem('email');
  if (token) {
    dispatch({type: 'signin', payload: {token, email}});
    navigate('Home');
  } else {
    navigate('Signin');
  }
};

const clearErrorMessage = (dispatch) => () => {
  dispatch({type: 'clear_error_message'});
};

const signup = (dispatch) => async ({email, password}) => {
  try {
    const response = await api.post('/signup', {email, password});
    await AsyncStorage.setItem('token', response.data.token);
    await AsyncStorage.setItem('email', email);
    dispatch({type: 'signin', payload: {token: response.data.token, email }});

    navigate('Home');
  } catch (err) {
    dispatch({
      type: 'add_error',
      payload: 'Something went wrong with the sign up',
    });
  }
};

const signin = (dispatch) => async ({email, password}) => {
  try {
    const response = await api.post('/signin', {email, password});
    await AsyncStorage.setItem('token', response.data.token);
    await AsyncStorage.setItem('email', email);
    dispatch({type: 'signin', payload: {token: response.data.token, email }});
    navigate('Home');
  } catch (err) {
    console.log(err);
    dispatch({type: 'add_error', payload: 'Please check your credentials'});
  }
};

const signout = (dispatch) => async () => {
  await AsyncStorage.removeItem('token');
  dispatch({type: 'signout'});
  navigate('Signin');
};

export const {Context, Provider} = createDataContext(
  authReducer,
  {signup, signin, signout, clearErrorMessage, tryLocalSignIn},
  {token: null, email:'', errorMessage: ''},
);
