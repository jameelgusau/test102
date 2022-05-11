import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  value: [],
}

export const Payments = createSlice({
  name: 'payments',
  initialState,
  reducers: {
    setPayments: (state, action) => {
      state.value = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { setPayments } = Payments.actions

export default Payments.reducer