import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: [],
};

export const OutofStock = createSlice({
  name: "outofStock",
  initialState,
  reducers: {
    setOutOfStock: (state, action) => {
      state.value = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setOutOfStock } = OutofStock.actions;

export default OutofStock.reducer;