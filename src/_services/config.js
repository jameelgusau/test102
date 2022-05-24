/* eslint-disable import/prefer-default-export */
export const APIS = {
  baseUrl: "http://localhost:4000/api",
  // baseUrl: "https://hommesestate.herokuapp.com/api",

  initSignup: {
    method: "POST",
    path: "/register-admin"
  },
  verifytoken: {
    method: "POST",
    path: "/verify-email"
  },
  refreshtoken: {
    method: "POST",
    path: "/refresh-token"
  },
  login: {
    method: "POST",
    path: "/authenticate"
  },
  initreset: {
    method: "POST",
    path: "/forgot-password"
  },
  passwordReset: {
    method: "POST",
    path: "/reset-password"
  },
  getProperties: {
    method: "GET",
    path: "/get-property"
  },
  addProperties: {
    method: "POST",
    path: "/add-property"
  },
  addUser: {
    method: "POST",
    path: "/add-user"
  },
  getUsers: {
    method: "GET",
    path: "/"
  },
  addUnit: {
    method: "POST",
    path: "/add-unit"
  },
  addProspect: {
    method: "POST",
    path: "/prospect"
  },
  getProspect: {
    method: "GET",
    path: "/prospect"
  },
  editProspect: {
    method: "PUT",
    path: "/prospect"
  },
  deleteProspect: {
    method: "DELETE",
    path: ({ id }) => `/prospect/${id}`
  },
  inviteLogin: {
    method: "POST",
    path: "/invite"
  },
  editUnit: {
    method: "PUT",
    path: "/edit-unit"
  },
  getProperty: {
    method: "GET",
    path: ({ id  }) => `/get-property/${id}`
  },
  deleteUnit: {
    method: "DELETE",
    path: ({ id }) => `/unit/${id}`
  },
  deleteProperty: {
    method: "DELETE",
    path: ({ id }) => `/property/${id}`
  },
  editProperty: {
    method: "PUT",
    path: "/edit-property"
  },
  editUser: {
    method: "PUT",
    path: "/edit-user"
  },
  editAgent: {
    method: "PUT",
    path: "/agent"
  },
  getUnits: {
    method: "GET",
    path: ({ id, floor }) => `/get-unitsbyfloor/${id}/${floor}`
  },
  setPropertyImage: {
    method: "POST",
    path: "/image"
  },
  getPropertyImage: {
    method: "GET",
    path: ({ id, floor }) => `/get-propertyimage/${id}/${floor}`
  },
  reserveUnit: {
    method: "POST",
    path:  "/reserve"
  },
  getReservedUnits: {
    method: "GET",
    path: "/get-reserved"
  },
  deleteReserveUnit: {
    method: "DELETE",
    path: ({ id }) => `/reserve/${id}`
  },
  deleteUser: {
    method: "DELETE",
    path: ({ id }) => `/${id}`
  },
  addEmailList: {
    method: "POST",
    path: "/email-list"
  },
  getEmailList: {
    method: "GET",
    path: ({ group }) => `/email-list/${group}`
  },
  deleteEmailList: {
    method: "DELETE",
    path: ({ id }) => `/email-list/${id}`
  },
  deleteAgent: {
    method: "DELETE",
    path: ({ id }) => `/agent/${id}`
  },
  getAllReserved: {
    method: "GET",
    path: "/get-allReserved"
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
    path: "/add-payment"
  },
  addAgent: {
    method: "POST",
    path: "/agent"
  },
  getPayments: {
    method: "GET",
    path: "/get-payments"
  },
  getAgents: {
    method: "GET",
    path: "/agent"
  },
  getAgentsList: {
    method: "GET",
    path: "/agentList"
  },
  getPayment: {
    method: "GET",
    path: ({ id }) => `/get-payment/${id}`
  },
  addProfileImage: {
    method: "POST",
    path: "/profileImage"
  },
  getProfileImage: {
    method: "GET",
    path: "/profileImage"
  },
  logout: {
    method: "POST",
    path: "/revoke-token"
  },
  refreshToken: {
    method: "POST",
    path: "/refresh-token"
  },
};
