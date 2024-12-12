// src/redux/store.js

import { configureStore } from '@reduxjs/toolkit';
import petReducer from './petSlice';
import beautyListReducer from './beautyList';

const store = configureStore({
  reducer: {
    pets: petReducer,
    beautyList: beautyListReducer,
  },
});

export default store;
