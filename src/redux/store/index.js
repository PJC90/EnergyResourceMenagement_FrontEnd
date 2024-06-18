import { combineReducers, configureStore } from '@reduxjs/toolkit'
import userReducer from '../reducers/user'
import companyReducer from '../reducers/company'
import deviceReducer from '../reducers/device'

const bigReducer = combineReducers({
  user: userReducer,
  company: companyReducer,
  device: deviceReducer,
})

const store = configureStore({
  reducer: bigReducer,
})

export default store
