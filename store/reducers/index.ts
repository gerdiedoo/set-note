// store/reducers/index.js
import { combineReducers } from 'redux';
import exampleReducer from './exampleReducer'; // Import your example reducer
import userReducer from './userReducer'; // Import your user reducer
import warmupReducer from './warmupReducer';
import workoutReducer from './workoutReducer';

const rootReducer = combineReducers({
  example: exampleReducer, // Add your reducers here
  user: userReducer, // Add your user reducer here
  // TO DO:
  // combine the two
  // create a weekly workout
  warmup: warmupReducer,
  workout: workoutReducer,
});

export default rootReducer;

