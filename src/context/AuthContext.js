import AsyncStorage from '@react-native-community/async-storage';
import createDataContext from './createDataContext';
import api from '../api/sayItOut';
import {navigate} from '../navigationRef';

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
        token: action.payload,
      };
    case 'signout':
      return {
        ...state,
        errorMessage: '',
        token: null,
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

  if (token) {
    dispatch({type: 'signin', payload: token});
    navigate('Home');
  } else {
    navigate('Signup');
  }
};

const clearErrorMessage = (dispatch) => () => {
  dispatch({type: 'clear_error_message'});
};

const signup = (dispatch) => async ({email, password}) => {
  try {
    const response = await api.post('/signup', {email, password});
    await AsyncStorage.setItem('token', response.data.token);
    dispatch({type: 'signin', payload: response.data.token});

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
    dispatch({type: 'signin', payload: response.data.token});
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
  {token: null, errorMessage: ''},
);
