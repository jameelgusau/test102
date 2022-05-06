import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  value: [],
}

export const EmailList = createSlice({
  name: 'emailList',
  initialState,
  reducers: {
    setEmailList: (state, action) => {
      state.value = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { setEmailList } = EmailList.actions

export default EmailList.reducer