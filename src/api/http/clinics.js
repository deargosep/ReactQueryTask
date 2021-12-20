import axios from '../index'

export const _getClinics = ({ queryKey, pageParam }) => {
  return axios.get('/medical_institutions/', {
    params: {
      sortBy: queryKey[0],
      pageParam
    }
  })
}
