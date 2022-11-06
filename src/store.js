import { combineReducers } from '@reduxjs/toolkit'
import userProfiles from './redux/userProfile'
import properties from './redux/Properties'
import units from './redux/Units'

import reservedUnits from './redux/reservedUnits'

import displays from './redux/display'
import users from './redux/users'
import prospects from './redux/prospects'
import emailList from './redux/emailList'
import allReserved from './redux/allReserved'
import Alert from './redux/snackbar'
import payment from './redux/payment'
import payments from './redux/payments'
import profileImage from './redux/profileImage'
import Agents from './redux/Agents'
import Agentslist from './redux/Agentslist'
import property from './redux/property'
import store from './redux/store'
import item from './redux/Item'
import category from './redux/category'
import dashReserved from './redux/dashReserved'
import outOfStock from './redux/outOfStock'
import dashPayment from './redux/dashPayment'
import dropdownCalls from './redux/dropdownCalls'

export const rootReducer = combineReducers({
      alert: Alert,
      userProfile: userProfiles,
      properties,
      units,
      users,
      agents: Agents,
      agentsList: Agentslist,
      reservedUnits,
      displays,
      prospects,
      emailList,
      allReserved,
      payment,
      profileImage,
      payments,
      property,
      store,
      item,
      category,
      dropdownCalls,
      dashReserved,
      dashPayment,
      outOfStock,

})