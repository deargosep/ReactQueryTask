import {
  makeRequest,
  createRequestStatuses,
  makeSimpleRequest
} from '../../utils/redux-utils'
import {
  _login,
  _getCurrentUser,
  _logout,
  _registerByPhone,
  _sendCode,
  _editProfile,
  _uploadPhoto
} from '../../../api/http/user'

export const SET_AUTH = createRequestStatuses('SET_AUTH')
export const login = (data, callbackSuccess, callbackError) =>
  makeRequest(SET_AUTH, _login, data, callbackSuccess, callbackError)

export const SET_USER = createRequestStatuses('SET_USER')
export const getCurrentUser = (data, callbackSuccess, callbackError) =>
  makeRequest(SET_USER, _getCurrentUser, data, callbackSuccess, callbackError)

export const registerByPhone = (data, callbackSuccess, callbackError) =>
  makeSimpleRequest(_registerByPhone, data, callbackSuccess, callbackError)

export const sendPhone = (data, callbackSuccess, callbackError) =>
  makeSimpleRequest(_login, data, callbackSuccess, callbackError)

export const sendINN = (data, callbackSuccess, callbackError) =>
  makeSimpleRequest(_login, data, callbackSuccess, callbackError)

export const sendCode = (data, callbackSuccess, callbackError) =>
  makeSimpleRequest(_sendCode, data, callbackSuccess, callbackError)

export const editProfile = (data, callbackSuccess, callbackError) =>
  makeSimpleRequest(_editProfile, data, callbackSuccess, callbackError)

export const uploadAvatar = (data, callbackSuccess, callbackError) =>
  makeSimpleRequest(_uploadPhoto, data, callbackSuccess, callbackError)
