import { createSlice } from '@reduxjs/toolkit';
import isDateMatch from '../../utils/isDateMatch';

const capsulesSlice = createSlice({
  name: 'capsules',
  initialState: {
    data: [], // This stores the filtered data
    unfilteredData: [], // This stores the original, unfiltered data
    loading: true,
    currentPage: 1,
    itemsPerPage: 5,
  },
  reducers: {
    setCapsules: (state, action) => {
      state.data = action.payload;
      state.unfilteredData = action.payload
      state.loading = false;
    },
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
    filterCapsules: (state, action) => {
        const { status, original_launch, type } = action.payload;
        console.log(action.payload)
        state.data = state.unfilteredData.filter((capsule) => {
          // Check if the payload items matches the capsule items
          const matchesStatus = !status || capsule.status.toLowerCase() === status.toLowerCase();
          const matchesLaunch = !original_launch || isDateMatch(capsule.original_launch, original_launch);
          const matchesType = !type || capsule.type.toLowerCase() === type.toLowerCase();
          return matchesStatus && matchesLaunch && matchesType;
        });
    },
      clearFilters: (state) => {
    state.data = [...state.unfilteredData];
  },
  },
});

export const { setCapsules, setCurrentPage, filterCapsules, clearFilters } = capsulesSlice.actions;
export default capsulesSlice.reducer;
