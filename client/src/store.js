import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import chatReducer from './reducers/chatReducer';

const store = createStore(
  chatReducer,
  composeWithDevTools(applyMiddleware(thunk))
);

export default store;
