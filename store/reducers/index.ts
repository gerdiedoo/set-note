// store/reducers/index.js
import { combineReducers } from 'redux';
import exampleReducer from './exampleReducer'; // Import your example reducer
import userReducer from './userReducer'; // Import your user reducer

const rootReducer = combineReducers({
  example: exampleReducer, // Add your reducers here
  user: userReducer, // Add your user reducer here
});

export default rootReducer;

