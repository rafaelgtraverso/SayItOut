import { ADD_ERROR, SIGN_IN, SIGN_OUT, CLEAR_ERROR_MESSAGE } from '../actions/types';

const initialState = {
    token: null,
    email: '',
    errorMessage:'',
};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
      case ADD_ERROR:
        return {
          ...state,
          errorMessage: action.payload,
        };
      case SIGN_IN:
        return {
          errorMessage: '',
          token: action.payload.token,
          email: action.payload.email
        };
      case SIGN_OUT:
        return {
          ...state,
          errorMessage: '',
          token: null,
          email:'', 
        };
      case CLEAR_ERROR_MESSAGE:
        return {
          ...state,
          errorMessage: '',
        };
      default:
        return state;
    }
  };

  export default authReducer;