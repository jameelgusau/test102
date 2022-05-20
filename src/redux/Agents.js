import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  value: [],
}

export const Agents = createSlice({
  name: 'agents',
  initialState,
  reducers: {
    setAgents: (state, action) => {
      state.value = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { setAgents } = Agents.actions

export default Agents.reducer