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

export const rootReducer = combineReducers({
      alert: Alert,
      userProfile: userProfiles,
      properties: properties,
      units: units,
      users: users,
      agents: Agents,
      agentsList: Agentslist,
      reservedUnits: reservedUnits,
      display: displays,
      prospects: prospects,
      emailList: emailList,
      allReserved: allReserved,
      payment: payment,
      profileImage: profileImage,
      payments: payments

})