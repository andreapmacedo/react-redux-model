import { legacy_createStore as createStore } from 'redux';
import { composeWithDevTools } from '@redux-devtools/extension';

// const INITIAL_STATE = { count: 0 };
// const reducer = (state = INITIAL_STATE, action) => state;
// const store = createStore(reducer, composeWithDevTools());

import counterReducer from './reducers/counterReducer';
const store = createStore(counterReducer, composeWithDevTools());


export default store;
