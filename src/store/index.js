import { configureStore } from '@reduxjs/toolkit';
import capsuleReducer from '../store/slices/capsuleSlice'
import selectedItemSlice from './slices/selectedItemSlice';

const store = configureStore({
  reducer: {
    capsules: capsuleReducer,
    selectedItem: selectedItemSlice,
  },
});

export default store;