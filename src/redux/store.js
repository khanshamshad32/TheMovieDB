import {createStore, combineReducers, applyMiddleware} from 'redux';
import {moviesReducer} from './reducer';
import thunk from 'redux-thunk';

const reducerTree = combineReducers({
  moviesReducer,
});

const getStore = () => {
  let store = createStore(reducerTree, applyMiddleware(thunk));

  return store;
};

export default getStore;
