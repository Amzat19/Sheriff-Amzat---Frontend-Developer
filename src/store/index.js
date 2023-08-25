import { configureStore } from '@reduxjs/toolkit';
import capsuleReducer from '../store/slices/capsuleSlice'

const store = configureStore({
  reducer: {
    capsules: capsuleReducer,
  },
});

export default store;