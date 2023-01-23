import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  value: {},
}

export const MyPayment = createSlice({
  name: 'mypayment',
  initialState,
  reducers: {
    setMyPayment: (state, action) => {
      state.value = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { setMyPayment } = MyPayment.actions

export default MyPayment.reducer