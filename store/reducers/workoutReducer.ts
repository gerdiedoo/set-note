// store/reducers/exampleReducer.js
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface workoutItem{
  id: number;
  type:string;
  name: string;
  rep: number;
  set: number;
}
const initialState:workoutItem[] = [];

const workoutSlice= createSlice({
  name: 'workout',
  initialState,
  reducers: {
    addWorkoutItem: (state, action: PayloadAction< workoutItem>) => {
      state.push(action.payload);
    },
    updateWorkoutItem: (state, action: PayloadAction< workoutItem>) => {
      const index = state.findIndex(item => item.id === action.payload.id);
      if (index !== -1) {
        state[index] = action.payload;
      }
    },
    removeWorkoutItem: (state, action: PayloadAction<number>) => {
      return state.filter(item => item.id !== action.payload);
    },
    setWorkoutItems: (state, action: PayloadAction<[workoutItem]>) => {
      return action.payload;
    },
  },
});

export const { addWorkoutItem, updateWorkoutItem, removeWorkoutItem, setWorkoutItems } = workoutSlice.actions;

export default workoutSlice.reducer;

