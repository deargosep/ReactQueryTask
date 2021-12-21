import axios from '../index'

import { useInfiniteQuery, useQuery } from 'react-query'

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

export const useGetClinics = (data) =>
  useInfiniteQuery(['clinics', data], _getClinics, {
    keepPreviousData: true,
    getNextPageParam: (lastPage, pages) => pages.length + 1
  })

export const setMoreClinics = (data) => {}
