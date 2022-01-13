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

const useQueryGet = (key, data) => {
  switch (key) {
    //  auth
    case 'currentSpecialist':
      return useQuery(
        'getCurrentSpecialist',
        _getCurrentSpecialist,
        defaultParams
      )
    case 'currentUser':
      return useQuery('getCurrentUser', _getCurrentUser, {
        ...defaultParams,
        ...data
      })
    case 'clinics':
      return useInfiniteQuery(['clinics', data], _getClinics, {
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
    case 'registerByPhone':
      return useQuery(
        'registerByPhone',
        () => _registerByPhone(data),
        defaultParams
      )
    case 'login':
      return useQuery('login', () => _login(data), defaultParams)
    case 'sendCode':
      return useQuery('sendCode', () => _sendCode(data), defaultParams)
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
