// capsulesSlice.js
import { createSlice } from '@reduxjs/toolkit';

const capsulesSlice = createSlice({
  name: 'capsules',
  initialState: {
    data: [],
    loading: true,
    currentPage: 1,
    itemsPerPage: 10,
  },
  reducers: {
    setCapsules: (state, action) => {
      state.data = action.payload;
      state.loading = false;
    },
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
  },
});

export const { setCapsules, setCurrentPage } = capsulesSlice.actions;
export default capsulesSlice.reducer;
