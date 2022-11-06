import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value:  { totalRecord: 0, records: [], totalPages: 0, currentPage: 0 },
}

export const Store = createSlice({
  name: "store",
  initialState,
  reducers: {
    setStore: (state, action) => {
      state.value = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setStore } = Store.actions;

export default Store.reducer;
