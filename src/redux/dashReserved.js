import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: [],
};

export const DashReserved = createSlice({
  name: "dashReserved",
  initialState,
  reducers: {
    setDashReserved: (state, action) => {
      state.value = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setDashReserved } = DashReserved.actions;

export default DashReserved.reducer;
