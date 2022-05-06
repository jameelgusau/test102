import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  value: null,
}

export const ProfileImage = createSlice({
  name: 'profileImage',
  initialState,
  reducers: {
    setProfileImage: (state, action) => {
      state.value = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { setProfileImage } = ProfileImage.actions

export default ProfileImage.reducer