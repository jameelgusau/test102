import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  value: [],
}

export const allReserved = createSlice({
  name: 'allReserved',
  initialState,
  reducers: {
    setAllReserved: (state, action) => {
      state.value = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { setAllReserved } = allReserved.actions

export default allReserved.reducer