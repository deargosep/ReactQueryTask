import { useQuery, queryCache } from 'react-query'
import { combineReducers } from 'redux'
// import { authReducer } from './auth/reducer'
import { modalsReducer } from './modals/reducer'

export function useSharedState(key, initialValue) {
  const { data: state } = useQuery(key, () => queryCache.getQueryData(key), {
    initialData: initialValue
  })

  const setState = (value) => queryCache.setQueryData(key, value)

  return [state, setState]
}

export default combineReducers({
  // auth: authReducer,
  modal: modalsReducer
})
