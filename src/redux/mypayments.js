import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  value:  { totalRecord: 0, records: [], totalPages: 0, currentPage: 0 },
}

export const MyPayments = createSlice({
  name: 'mypayments',
  initialState,
  reducers: {
    setMyPayments: (state, action) => {
      state.value = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { setMyPayments } = MyPayments.actions

export default MyPayments.reducer