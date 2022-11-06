import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  stores: [],
  categories: [],
  users: [],
  admin: [],
  adminUsers: [],
  clients: [],
};

export const DropdoownCalls = createSlice({
  name: "dropdownCalls",
  initialState,
  reducers: {
    setDropdownStores: (state, action) => {
      state.stores = action.payload;
    },
    setDropdownClients: (state, action) => {
      state.clients = action.payload;
    },
    setDropdownCategories: (state, action) => {
      state.categories = action.payload;
    },
    setDropdownUsers: (state, action) => {
      state.users = action.payload;
    },
    setDropdownAdmin: (state, action) => {
      state.admin = action.payload;
    },
    setDropdownAdminUsers: (state, action) => {
      state.adminUsers = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  setDropdownAdminUsers,
  setDropdownCategories,
  setDropdownUsers,
  setDropdownAdmin,
  setDropdownStores,
  setDropdownClients
} = DropdoownCalls.actions


export default DropdoownCalls.reducer;
