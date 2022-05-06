import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  value: [],
}

export const Properties = createSlice({
  name: 'properties',
  initialState,
  reducers: {
    setProperties: (state, action) => {
      state.value = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { setProperties } = Properties.actions

export default Properties.reducer