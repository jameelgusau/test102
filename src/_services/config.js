/* eslint-disable import/prefer-default-export */
export const APIS = {
  // baseUrl: "https://api.hommesestate.com:9090/api",
  baseUrl: "http://localhost:9090/api",
  // https://api.hommesestate.com:9090/
  // baseUrl: "https://hommesestate.herokuapp.com/api",

  initSignup: {
    method: "POST",
    path: "/register-admin",
  },
  verifytoken: {
    method: "POST",
    path: "/verify-email",
  },
  refreshtoken: {
    method: "POST",
    path: "/refresh-token",
  },
  login: {
    method: "POST",
    path: "/authenticate",
  },
  initreset: {
    method: "POST",
    path: "/forgot-password",
  },
  passwordReset: {
    method: "POST",
    path: "/reset-password",
  },
  getProperties: {
    method: "GET",
    path: "/get-property",
  },
  addProperties: {
    method: "POST",
    path: "/add-property",
  },
  addUser: {
    method: "POST",
    path: "/add-user",
  },
  getUsers: {
    method: "GET",
    path: ( {  search,page }) => {   
      return `/?page=${page || 0}${search ? `&search=${search}` : ''}`
    }
  },
  addUnit: {
    method: "POST",
    path: "/add-unit",
  },
  addProspect: {
    method: "POST",
    path: "/prospect",
  },
  getProspect: {
    method: "GET",
    path: ( {  search,page }) => {   
      return `/prospect?page=${page || 0}${search ? `&search=${search}` : ''}`
    }
  },
  editProspect: {
    method: "PUT",
    path: "/prospect",
  },
  deleteProspect: {
    method: "DELETE",
    path: ({ id }) => `/prospect/${id}`,
  },
  inviteLogin: {
    method: "POST",
    path: "/invite",
  },
  editUnit: {
    method: "PUT",
    path: "/edit-unit",
  },
  getProperty: {
    method: "GET",
    path: ({ id }) => `/get-property/${id}`,
  },
  deleteUnit: {
    method: "DELETE",
    path: ({ id }) => `/unit/${id}`,
  },
  deleteProperty: {
    method: "DELETE",
    path: ({ id }) => `/property/${id}`,
  },
  editProperty: {
    method: "PUT",
    path: "/edit-property",
  },
  editUser: {
    method: "PUT",
    path: "/edit-user",
  },
  editAgent: {
    method: "PUT",
    path: "/agent",
  },
  getUnits: {
    method: "GET",
    path: ({ id, floor }) => `/get-unitsbyfloor/${id}/${floor}`,
  },
  setFloorImage: {
    method: "POST",
    path: "/image",
  },
  getPropertyImage: {
    method: "GET",
    path: ({ id, floor }) => `/get-propertyimage/${id}/${floor}`,
  },
  reserveUnit: {
    method: "POST",
    path: "/reserve",
  },
  getReservedUnits: {
    method: "GET",
    path: "/get-reserved",
  },
  deleteReserveUnit: {
    method: "DELETE",
    path: ({ id }) => `/reserve/${id}`,
  },
  deleteUser: {
    method: "DELETE",
    path: ({ id }) => `/${id}`,
  },
  addEmailList: {
    method: "POST",
    path: "/email-list",
  },
  getEmailList: {
    method: "GET",
    path: ({ group }) => `/email-list/${group}`,
  },
  deleteEmailList: {
    method: "DELETE",
    path: ({ id }) => `/email-list/${id}`,
  },
  deleteAgent: {
    method: "DELETE",
    path: ({ id }) => `/agent/${id}`,
  },
  getAllReserved: {
    method: "GET",
    path: ( {  search,page, startDate, endDate, select }) => {   
      return `/get-allReserved?page=${page || 0}${search ? `&search=${search}` : ''}${startDate ? `&startDate=${startDate}` : ''}${endDate ? `&endDate=${endDate}` : ''}${select ? `&select=${select}` : ''}`
    }
  },
  sendRejectLetter: {
    method: "POST",
    path: "/rejection-letter",
  },
  sendOfferLetter: {
    method: "POST",
    path: "/offer-letter",
  },
  addPayment: {
    method: "POST",
    path: "/add-payment",
  },
  addAgent: {
    method: "POST",
    path: "/agent",
  },
  getPayments: {
    method: "GET",
    path: ( {  search,page }) => {   
      return `/get-payments?page=${page || 0}${search ? `&search=${search}` : ''}`
    }
  },
  getMyPayments: {
    method: "GET",
    path: ( {  search,page }) => {   
      return `/get-mypayments?page=${page || 0}${search ? `&search=${search}` : ''}`
    }
  },
  getAgents: {
    method: "GET",
    path: "/agent",
  },
  getAgentsList: {
    method: "GET",
    path: "/agentList",
  },
  getPayment: {
    method: "GET",
    path: ({ id }) => `/get-payment/${id}`,
  },
  addProfileImage: {
    method: "POST",
    path: "/profileImage",
  },
  getProfileImage: {
    method: "GET",
    path: "/profileImage",
  },
  logout: {
    method: "POST",
    path: "/revoke-token",
  },
  refreshToken: {
    method: "POST",
    path: "/refresh-token",
  },
  revokeToken: {
    method: "POST",
    path: "/revoke-token",
  },
  upload: {
    method: "POST",
    path: "/upload",
  },
  getStore: {
    method: "GET",
    path: ( {  search,page }) => {   
      return `/store?page=${page || 0}${search ? `&search=${search}` : ''}`
    }
  },
  addStore: {
    method: "POST",
    path: "/store",
  },
  editStore: {
    method: "PUT",
    path: "/store",
  },
  deleteStore: {
    method: "DELETE",
    path: ({ id }) => `/store/${id}`,
  },
  getItem: {
    method: "GET",
    path: ( {  search,page }) => {   
      return `/item?page=${page || 0}${search ? `&search=${search}` : ''}`
    }
  },
  addItem: {
    method: "POST",
    path: "/item",
  },
  editItem: {
    method: "PUT",
    path: "/item",
  },
  deleteItem: {
    method: "DELETE",
    path: ({ id }) => `/item/${id}`,
  },
  getCategory: {
    method: "GET",
    path: ( {  search,page }) => {   
      return `/category?page=${page || 0}${search ? `&search=${search}` : ''}`
    }
  },
  addCategory: {
    method: "POST",
    path: "/category",
  },
  editCaterory: {
    method: "PUT",
    path: "/category",
  },
  deleteCaterory: {
    method: "DELETE",
    path: ({ id }) => `/category/${id}`,
  },
  restock: {
    method: "POST",
    path: "/restock",
  },
  allocate: {
    method: "POST",
    path: "/allocate",
  },
  getDashReserved: {
    method: "GET",
    path: "/get-dash-reserved",
  },
  getDashPayment: {
    method: "GET",
    path: "/get-dash-payments",
  },
  getOutOfStock: {
    method: "GET",
    path: "/get-outofStock",
  },
  getCounts: {
    method: "GET",
    path: "/get-counts",
  },
  getStatus: {
    method: "GET",
    path: "/get-status",
  },
  getChart: {
    method: "GET",
    path: "/get-dash-chart",
  },
  getDropdownStores: {
    method: "GET",
    path: "/get-dropdown-stores",
  },
  getDropdownCategories: {
    method: "GET",
    path: "/get-dropdown-categories",
  },
  getDropdownAdminUsers: {
    method: "GET",
    path: "/get-dropdown-adminusers",
  },
  getDropdownClients: {
    method: "GET",
    path: "/get-dropdown-clients",
  },
  getDropdownUsers: {
    method: "GET",
    path: "/get-dropdown-users",
  },
  acceptPayment: {
    method: "POST",
    path: "/accept-payment",
  },
  rejectPayment: {
    method: "POST",
    path: "/reject-payment",
  },
  authorizedSignature: {
    method: "POST",
    path: "/authorised-signature",
  },
  addSignature: {
    method: "POST",
    path: "/upload-signature",
  },
  getSignature: {
    method: "GET",
    path: "/get-signature",
  },
  appendSignature: {
    method: "POST",
    path: "/append-signature",
  },
  finalAllocation: {
    method: "POST",
    path: "/final-allocation",
  },
  getCertificates: {
    method: "GET",
    path: ( {  search,page }) => {   
      return `/get-certificates?page=${page || 0}${search ? `&search=${search}` : ''}`
    }
  },
  getMyCertificates: {
    method: "GET",
    path: ( {  search,page }) => {   
      return `/get-mycertificates?page=${page || 0}${search ? `&search=${search}` : ''}`
    }
  },
  getCertificate: {
    method: "GET",
    path: ({ id }) => `/get-certificate/${id}`,
  },

};
