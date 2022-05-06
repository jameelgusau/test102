import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  value: [],
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