import { createSlice } from '@reduxjs/toolkit'


const initialState = {
  value:  { totalRecord: 0, records: [], totalPages: 0, currentPage: 0 },
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