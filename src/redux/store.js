// src/redux/store.js

import { configureStore } from '@reduxjs/toolkit';
import petReducer from './petSlice';
import beautyListReducer from './beautyList';
import reservationDataReducer from './reservationData';

const store = configureStore({
  reducer: {
    pets: petReducer,
    beautyList: beautyListReducer,
    reservationData: reservationDataReducer
  },
});

export default store;
