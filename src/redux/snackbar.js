import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  value: {
      open: false,
      severity: "",
      color: "",
      message: ""

  },
}

export const Alert = createSlice({
  name: 'alert',
  initialState,
  reducers: {
    setAlert: (state, action) => {
      state.value = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { setAlert } = Alert.actions

export default Alert.reducer