import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  value:  { totalRecord: 0, records: [], totalPages: 0, currentPage: 0 }
}

export const Certificates = createSlice({
  name: 'certificates',
  initialState,
  reducers: {
    setCertificates: (state, action) => {
      state.value = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { setCertificates } = Certificates.actions

export default Certificates.reducer