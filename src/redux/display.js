import { createSlice, createEntityAdapter } from "@reduxjs/toolkit";
import { PURGE } from "redux-persist";

const articlesAdapter = createEntityAdapter()

const initialState = {
  openAddProspect: "none",
  openEditProspect: "none",
  openDeleteProspect: "none",
  openLoginInvite: "none",
  openEditUser: "none",
  openAddUser: "none",
  openDeleteUser: "none",
  openAddUnit: "none",
  openEditUnit: "none",
  openDeleteUnit: "none",
  openAddProperty: "none",
  openEditProperty: "none",
  openDeleteProperty: "none",
  openReserve: "none",
  openReserveDetail: "none",
  openUploadPayment: "none",
  openAddImage: "none",
  openDeleteReserve: "none",
  openDeleteEmailList: "none",
  openEmailList: "none",
  openSettings: "none",
  openAddAgent: "none",
  openEditAgent: "none",
  openDeleteAgent: "none",
  openAddStore: "none",
  openEditStore: "none",
  openDeleteStore: "none",
  openAddItem: "none",
  openEditItem: "none",
  openDeleteItem: "none",
  openAllocate: "none",
  openRestock: "none",
};


export const displays = createSlice({
  name: "displays",
  initialState,
  reducers: {
    displayReserve: (state, action) => {
      state.openReserve = action.payload;
    },
    displayReserveDetail: (state, action) => {
      state.openReserveDetail = action.payload;
    },
    displayUploadPayment: (state, action) => {
      state.openUploadPayment = action.payload;
    },
    displayAddProperty : (state, action) => {
      state.openAddProperty = action.payload;
    },
    displayEditProperty: (state, action) => {
      state.openEditProperty = action.payload;
    },
    displayDeleteProperty: (state, action) => {
      state.openDeleteProperty = action.payload;
    },
    displayAddUnit: (state, action) => {
      state.openAddUnit = action.payload;
    },
    displayEditUnit: (state, action) => {
      state.openEditUnit = action.payload;
    },
    displayDeleteUnit: (state, action) => {
      state.openDeleteUnit = action.payload;
    },
    displayAddProspect: (state, action) => {
      state.openAddProspect = action.payload;
    },
    displayEditProspect: (state, action) => {
      state.openEditProspect = action.payload;
    },
    displayDeleteProspect: (state, action) => {
      state.openDeleteProspect = action.payload;
    },
    displayLoginInvite: (state, action) => {
      state.openLoginInvite = action.payload;
    },
    displayAddUser: (state, action) => {
      state.openAddUser = action.payload;
    },
    displayEditUser: (state, action) => {
      state.openEditUser = action.payload;
    },
    displayDeleteUser: (state, action) => {
      state.openDeleteUser = action.payload;
    },

    displayAddImage: (state, action) => {
      state.openAddImage = action.payload;
    },
    displayDeleteReserve: (state, action) => {
      state.openDeleteReserve = action.payload;
    },
    displayDeleteEmailList: (state, action) => {
      state.openDeleteEmailList = action.payload;
    },
    displayAddEmailList: (state, action) => {
      state.openEmailList = action.payload;
    },
    displaySettings: (state, action) => {
      state.openSettings = action.payload;
    },
    displayDeleteAgent: (state, action) => {
      state.openDeleteAgent = action.payload;
    },
    displayAddAgent: (state, action) => {
      state.openAddAgent = action.payload;
    },
    displayEditAgent: (state, action) => {
      state.openEditAgent = action.payload;
    },
    displayDeleteStore: (state, action) => {
      state.openDeleteStore = action.payload;
    },
    displayAddStore: (state, action) => {
      state.openAddStore = action.payload;
    },
    displayEditStore: (state, action) => {
      state.openEditStore = action.payload;
    },
    displayDeleteItem: (state, action) => {
      state.openDeleteItem = action.payload;
    },
    displayAddItem: (state, action) => {
      state.openAddItem = action.payload;
    },
    displayEditItem: (state, action) => {
      state.openEditItem = action.payload;
    },
    displayAllocate: (state, action) => {
      state.openAllocate = action.payload;
    },
    displayRestock: (state, action) => {
      state.openRestock = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(PURGE, (state)=>{
      articlesAdapter.removeAll(state)
    })
  }
});

// Action creators are generated for each case reducer function
export const {
  displayRestock,
  displayAllocate,
  displayEditItem,
  displayAddItem,
  displayDeleteItem,
  displayEditStore,
  displayAddStore,
  displayDeleteStore,
  displayEditAgent,
  displayAddAgent,
  displayDeleteAgent,
  displayDeleteReserve,
  displayAddImage,
  displayReserve,
  displayDeleteProperty,
  displayEditProperty,
  displayAddProperty,
  displayDeleteUnit,
  displayEditUnit,
  displayAddUnit,
  displayDeleteUser,
  displayEditUser,
  displayAddUser,
  displayDeleteProspect,
  displayEditProspect,
  displayAddProspect,
  displayLoginInvite,
  displayDeleteEmailList,
  displayAddEmailList,
  displayReserveDetail,
  displayUploadPayment,
  displaySettings
} = displays.actions;

export default displays.reducer;
