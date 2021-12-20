import { REQUEST, SUCCESS, FAILURE } from '../constants/statuses'

export const action = (type, payload = {}) => {
  return { type, payload }
}

export const createRequestStatuses = (reqNamespace) => {
  return [REQUEST, SUCCESS, FAILURE].reduce((reqStatus, reqType) => {
    reqStatus[reqType] = `${reqNamespace}_${reqType}`
    return reqStatus
  }, {})
}

export const createStatusActions = (type) => {
  return {
    request: () => action(type[REQUEST]),
    success: (response) => action(type[SUCCESS], response),
    failure: (error) => action(type[FAILURE], error)
  }
}

export const makeSimpleRequest = (
  apiReq,
  payload = {},
  callbackSuccess = () => {},
  callbackError = () => {}
) => {
  return async () => {
    try {
      const resp = await apiReq(payload)
      callbackSuccess(resp.data)
    } catch (error) {
      callbackError(error)
    }
  }
}

export const makeRequest = (
  reqStatuses,
  apiReq,
  payload = {},
  callbackSuccess = () => {},
  callbackError = () => {},
  paging = {}
) => {
  const action = createStatusActions(reqStatuses)

  return async (dispatch) => {
    dispatch(action.request())
    try {
      const resp = await apiReq(payload, paging)
      dispatch(action.success({ data: resp.data, paging }))
      callbackSuccess(resp.data)
    } catch (error) {
      dispatch(action.failure(error))
      callbackError(error)
    }
  }
}
