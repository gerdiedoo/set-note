// store/reducers/exampleReducer.js
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface warmupItem{
  id: number;
  type:string;
  name: string;
  rep: number;
  set: number;
}
const initialState:warmupItem[] = [];

const warmupSlice = createSlice({
  name: 'warmup',
  initialState,
  reducers: {
    addWarmupItem: (state, action: PayloadAction<warmupItem>) => {
      state.push(action.payload);
    },
    updateWarmupItem: (state, action: PayloadAction<warmupItem>) => {
      const index = state.findIndex(item => item.id === action.payload.id);
      if (index !== -1) {
        state[index] = action.payload;
      }
    },
    removeWarmupItem: (state, action: PayloadAction<number>) => {
      return state.filter(item => item.id !== action.payload);
    },
    setWarmupItems: (state, action: PayloadAction<[warmupItem]>) => {
      return action.payload;
    },
  },
});

export const { addWarmupItem, updateWarmupItem, removeWarmupItem, setWarmupItems } = warmupSlice.actions;

export default warmupSlice.reducer;

