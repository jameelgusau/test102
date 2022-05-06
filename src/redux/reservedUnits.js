import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  value: [],
}

export const reservedUnits = createSlice({
  name: 'reservedUnits',
  initialState,
  reducers: {
    setReservedUnits: (state, action) => {
      state.value = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { setReservedUnits } = reservedUnits.actions

export default reservedUnits.reducer