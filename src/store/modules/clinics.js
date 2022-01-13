import { useInfiniteQuery } from 'react-query'
import { _getClinics } from 'api/http/clinics'

export const useGetClinics = (data) =>
  useInfiniteQuery(['clinics', data], _getClinics, {
    keepPreviousData: false,
    getNextPageParam: (lastPage, pages) => pages.length + 1
  })
