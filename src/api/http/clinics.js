import axios from '../index'

export const _getClinics = async ({ queryKey, pageParam = 1 }) => {
  console.log(pageParam)
  const res = await axios.get('/medical_institutions/', {
    params: {
      ...queryKey[1],
      page: pageParam
    }
  })
  return res.data
}
