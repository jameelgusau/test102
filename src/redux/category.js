import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value:  { totalRecord: 0, records: [], totalPages: 0, currentPage: 0 },
}

export const Category = createSlice({
  name: "category",
  initialState,
  reducers: {
    setCategory: (state, action) => {
      state.value = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setCategory } = Category.actions;

export default Category.reducer;