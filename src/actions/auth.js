import { ADD_ERROR, SIGN_IN, SIGN_OUT, CLEAR_ERROR_MESSAGE } from '../actions/types';

export const clearErrorMessage = () => (
  {
  type: CLEAR_ERROR_MESSAGE
});

export const authError = (message) => (
  {
    type: ADD_ERROR,
    payload: message,
  }
);

export const signin = (token,email) => (
  {
    type: SIGN_IN,
    payload:{token, email}
  }
);

export const signout = () => (
  {
    type: SIGN_OUT
  }
);


  