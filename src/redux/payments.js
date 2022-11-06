import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  value:  { totalRecord: 0, records: [], totalPages: 0, currentPage: 0 },
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