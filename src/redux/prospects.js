import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  value:  { totalRecord: 0, records: [], totalPages: 0, currentPage: 0 },
}

export const Prospect = createSlice({
  name: 'prospects',
  initialState,
  reducers: {
    setProspect: (state, action) => {
      state.value = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { setProspect } = Prospect.actions

export default Prospect.reducer