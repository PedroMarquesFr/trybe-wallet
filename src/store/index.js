// importe o método applyMiddleware
import { createStore, applyMiddleware, compose } from 'redux';
// importe o redux-thunk
import thunk from 'redux-thunk';
import reducers from '../reducers';

// aplique o middleware
const composed = compose(
  applyMiddleware(thunk),
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
);
const store = createStore(reducers, composed);

export default store;
