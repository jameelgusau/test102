import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  value: [],
}

export const AgentsList = createSlice({
  name: 'agentsList',
  initialState,
  reducers: {
    setAgentsList: (state, action) => {
      state.value = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { setAgentsList } = AgentsList.actions

export default AgentsList.reducer