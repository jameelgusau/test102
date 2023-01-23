import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  value:  { totalRecord: 0, records: [], totalPages: 0, currentPage: 0 }
}

export const MyCertificates = createSlice({
  name: 'mycertificates',
  initialState,
  reducers: {
    setMyCertificates: (state, action) => {
      state.value = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { setMyCertificates } = MyCertificates.actions

export default MyCertificates.reducer