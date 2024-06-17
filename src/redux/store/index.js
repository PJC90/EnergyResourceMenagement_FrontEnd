import { combineReducers, configureStore } from '@reduxjs/toolkit'
import userReducer from '../reducers/user'
import companyReducer from '../reducers/company'

const bigReducer = combineReducers({
  user: userReducer,
  company: companyReducer,
})

const store = configureStore({
  reducer: bigReducer,
})

export default store
