import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  value:  { totalRecord: 0, records: [], totalPages: 0, currentPage: 0 },
}

export const Users = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setUsers: (state, action) => {
      state.value = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { setUsers } = Users.actions

export default Users.reducer