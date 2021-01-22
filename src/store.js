import { createStore, combineReducers, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';
import promise from 'redux-promise-middleware';
import authReducer from './reducers/authReducer';
import phraseReducer from './reducers/phraseReducer';


const rootReducer = combineReducers({
    authReducer: authReducer,
    phraseReducer: phraseReducer,
});

const middleware = applyMiddleware(promise, thunk, createLogger());
const configureStore = () => createStore(rootReducer, middleware);

export default configureStore;