// store/index.js
import { configureStore } from '@reduxjs/toolkit';
import {createStore} from 'redux';
import rootReducer from './reducers'; // Import your root reducer
import AsyncStorage from '@react-native-async-storage/async-storage';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

// const store = configurestore({
//   reducer: rootreducer,
// });

// const persistor = persistStore(store);

export const store = createStore(persistedReducer);
export const persistor = persistStore(store);
