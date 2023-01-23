import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  value: {},
}

export const Certificate = createSlice({
  name: 'certificate',
  initialState,
  reducers: {
    setCertificate: (state, action) => {
      state.value = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { setCertificate } = Certificate.actions

export default Certificate.reducer