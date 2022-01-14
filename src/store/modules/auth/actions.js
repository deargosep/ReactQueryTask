import {
  makeRequest,
  createRequestStatuses,
  makeSimpleRequest
} from '../../utils/redux-utils'
import {
  _login,
  _getCurrentUser,
  _getCurrentSpecialist,
  _logout,
  _registerByPhone,
  _sendCode,
  _editProfile,
  _uploadPhoto
} from '../../../api/http/user'
import { useQuery } from 'react-query'

const defaultParams = {
  enabled: false,
  retry: false
}

export const useRegisterByPhone = (data) =>
  useQuery('registerByPhone', () => _registerByPhone(data), defaultParams)

export const useLogin = (data) =>
  useQuery('login', () => _login(data), defaultParams)

export const useSendCode = (data) =>
  useQuery('sendCode', () => _sendCode(data), defaultParams)

export const useEditProfile = (data) =>
  useQuery('editProfile', () => _editProfile(data), defaultParams)

export const useUploadPhoto = (data) =>
  useQuery('uploadPhoto', () => _uploadPhoto(data), defaultParams)

export const useCurrentUser = (data) =>
  useQuery('currentUser', _getCurrentUser, { ...defaultParams, ...data })

export const useCurrentSpecialist = (data) =>
  useQuery('currentSpecialist', _getCurrentSpecialist, defaultParams)
