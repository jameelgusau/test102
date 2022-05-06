import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  value: {},
}

export const Payment = createSlice({
  name: 'payment',
  initialState,
  reducers: {
    setPayment: (state, action) => {
      state.value = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { setPayment } = Payment.actions

export default Payment.reducer