// selectedItemSlice.js
import { createSlice } from '@reduxjs/toolkit';

const selectedItemSlice = createSlice({
  name: 'selectedItem',
  initialState: {
    item: null,
    isOpen: false,
  },
  reducers: {
    setSelectedItem: (state, action) => {
      state.item = action.payload;
      state.isOpen = true;
    },
    clearSelectedItem: (state) => {
      state.item = null;
      state.isOpen = false;
    },
  },
});

export const { setSelectedItem, clearSelectedItem } = selectedItemSlice.actions;
export default selectedItemSlice.reducer;
