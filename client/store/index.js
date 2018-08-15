
import {createStore, combineReducers, applyMiddleware} from 'redux'
import createLogger from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import user from './user'
import rooms from './rooms'
import room from './room'
import searchReducer from './searchReducer'
import queue from './queue';

const reducer = combineReducers({user, rooms, room, queue, searchReducer});

const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({collapsed: true}))
);
const store = createStore(reducer, middleware);


export default store
export * from './user'
export * from './room'
export * from './rooms'
export * from './searchReducer'
export * from './queue';
