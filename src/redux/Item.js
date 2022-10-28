import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: [],
};

export const Item = createSlice({
  name: "item",
  initialState,
  reducers: {
    setItem: (state, action) => {
      state.value = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setItem } = Item.actions;

export default Item.reducer;