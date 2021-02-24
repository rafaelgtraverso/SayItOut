import { ALL_CATEGORIES, CATEGORY, CATEGORY_DATA } from '../actions/types';

const initialState = {
    cat_name:'',
    categories:null,
    cat_cards:null,
};

const cardsReducer = (state = initialState, action) => {
    switch (action.type) {
      case CATEGORY:
        return {
          cat_name: action.payload,
        };
      case ALL_CATEGORIES:
        return {
          categories: action.payload,
        };
      case CATEGORY_DATA:
        return {
          ...state,
          cat_cards: action.payload,
        };
      default:
        return state;
    }
  };

  export default cardsReducer;