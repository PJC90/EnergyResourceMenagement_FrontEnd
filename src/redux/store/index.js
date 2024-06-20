import { combineReducers, configureStore } from '@reduxjs/toolkit'
import userReducer from '../reducers/user'
import companyReducer from '../reducers/company'
import deviceReducer from '../reducers/device'
import readingReducer from '../reducers/reading'

const bigReducer = combineReducers({
  user: userReducer,
  company: companyReducer,
  device: deviceReducer,
  reading: readingReducer,
})

const store = configureStore({
  reducer: bigReducer,
})

export default store
