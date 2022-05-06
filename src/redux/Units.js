import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  value: [],
}

export const Units = createSlice({
  name: 'units',
  initialState,
  reducers: {
    setUnits: (state, action) => {
      state.value = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { setUnits } = Units.actions

export default Units.reducer