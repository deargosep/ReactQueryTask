// import { useMutation, useQuery, useQueryClient } from 'react-query'
import { SET_MODAL } from './reducer'

export const setModal = (modal) => ({
  type: SET_MODAL,
  payload: modal
})

// export const useGetModal = (data) => useQuery('modal', )

// export const useSetModal = (data) => {
//   const queryClient = useQueryClient()
//   useMutation((modal) => {}, {
//     onSuccess: () => {
//       // Invalidate and refetch
//       queryClient.invalidateQueries('todos')
//     }
//   }).mutate(data)
// }
