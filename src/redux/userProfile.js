import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  value: {},
}

export const userProfiles = createSlice({
  name: 'userProfiles',
  initialState,
  reducers: {
    userProfile: (state, action) => {
      state.value = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { userProfile } = userProfiles.actions

export default userProfiles.reducer