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
import profileImage from './redux/profileImage'

export const rootReducer = combineReducers({
      alert: Alert,
      userProfile: userProfiles,
      properties: properties,
      units: units,
      users: users,
      reservedUnits: reservedUnits,
      display: displays,
      prospects: prospects,
      emailList: emailList,
      allReserved: allReserved,
      payment: payment,
      profileImage: profileImage

})