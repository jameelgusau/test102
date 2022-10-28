import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: [],
};

export const DashPayment = createSlice({
  name: "dashPayment",
  initialState,
  reducers: {
    setDashPayment: (state, action) => {
      state.value = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setDashPayment } = DashPayment.actions;

export default DashPayment.reducer;
