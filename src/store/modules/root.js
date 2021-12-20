import { combineReducers } from 'redux'
import { authReducer } from './auth/reducer'
import { modalsReducer } from './modals/reducer'

export default combineReducers({
  auth: authReducer,
  modal: modalsReducer
})
