import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import itemReducer from './reducers/itemReducer.js';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
// const store = createStore(reducer, /* preloadedState, */ composeEnhancers(

const store = createStore(
  itemReducer,
  [],
  composeEnhancers(applyMiddleware(thunk))
);

export default store;