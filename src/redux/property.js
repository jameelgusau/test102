import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  value: {},
}

export const Property = createSlice({
  name: 'property',
  initialState,
  reducers: {
    setProperty: (state, action) => {
      state.value = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { setProperty } = Property.actions

export default Property.reducer