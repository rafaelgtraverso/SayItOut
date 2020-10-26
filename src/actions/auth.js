import { ADD_ERROR, SIGN_IN, SIGN_OUT, CLEAR_ERROR_MESSAGE } from '../actions/types';
import api from '../api/remote/heroku';
import AsyncStorage from '@react-native-community/async-storage';
import { navigate } from '../navigationRef';


// export const tryLocalSignIn =  () =>{console.log(1)}
export const tryLocalSignIn = (dispatch) => async () => {
  const token = await AsyncStorage.getItem('token');
  const email = await AsyncStorage.getItem('email');
  if (token) {
    dispatch({type: SIGN_IN, payload: {token, email}});
    navigate('Home');
  } else {
    navigate('Signin');
  }
};

export const clearErrorMessage = () => (
  {
  type: CLEAR_ERROR_MESSAGE
});

export const signup = (dispatch) => async ({email, password}) => {
  // console.log({email});
  try {
    const response = await api.post('/signup', {email, password});
    await AsyncStorage.setItem('token', response.data.token);
    await AsyncStorage.setItem('email', email);

    dispatch({type: SIGN_IN, payload: {token: response.data.token, email }});

    navigate('Home');
  } catch (err) {
    dispatch({
      type: ADD_ERROR,
      payload: 'Something went wrong with the sign up',
    });
  }
};

export const signin = (dispatch) => async ({email, password}) => {
  try {
    const response = await api.post('/signin', {email, password});
    await AsyncStorage.setItem('token', response.data.token);
    await AsyncStorage.setItem('email', email);
    console.log(response);
    dispatch({type: SIGN_IN, payload: {token: response.data.token, email }});
    navigate('Home');
  } catch (err) {
    console.log(err);
    dispatch({type: ADD_ERROR, payload: 'Please check your credentials'});
  }
};

export const signout = (dispatch) => async () => {
  await AsyncStorage.removeItem('token');
  dispatch({type: SIGN_OUT});
  navigate('Signin');
};

  