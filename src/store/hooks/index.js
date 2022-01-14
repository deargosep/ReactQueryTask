import { useInfiniteQuery, useQuery } from 'react-query'
import {
  _getCurrentSpecialist,
  _getCurrentUser,
  _login,
  _registerByPhone,
  _sendCode
} from 'api/http/user'
import { _getClinics } from 'api/http/clinics'

const defaultParams = {
  enabled: false,
  retry: false
}

// constants
const CURRENT_SPECIALIST = 'currentSpecialist'
const CURRENT_USER = 'currentUser'
const CLINICS = 'clinics'

const REGISTER_BY_PHONE = 'registerByPhone'
const LOGIN = 'login'
const SEND_CODE = 'sendCode'
const EDIT_PROFILE = 'editProfile'

const useQueryGet = (key, data) => {
  switch (key) {
    //  auth
    case CURRENT_SPECIALIST:
      return useQuery(CURRENT_SPECIALIST, _getCurrentSpecialist, defaultParams)
    case CURRENT_USER:
      return useQuery(CURRENT_USER, _getCurrentUser, {
        ...defaultParams,
        ...data
      })
    case CLINICS:
      return useInfiniteQuery([CLINICS, data], _getClinics, {
        keepPreviousData: false,
        getNextPageParam: (lastPage, pages) => pages.length + 1
      })
    default:
      console.error('wrong key!')
      break
  }
}

const useQueryPost = (key, data) => {
  switch (key) {
    //  auth
    case REGISTER_BY_PHONE:
      return useQuery(
        REGISTER_BY_PHONE,
        () => _registerByPhone(data),
        defaultParams
      )
    case LOGIN:
      return useQuery(LOGIN, () => _login(data), defaultParams)
    case SEND_CODE:
      return useQuery(SEND_CODE, () => _sendCode(data), defaultParams)
    default:
      console.error('wrong key!')
      break
  }
}

const useQueryPatch = (key, data) => {
  switch (key) {
    case 'editProfile':
      return useQuery('editProfile', () => _editProfile(data), defaultParams)
    default:
      console.error('wrong key!')
      break
  }
}

export { useQueryGet, useQueryPost, useQueryPatch }
