import { treadService } from '@shared/api/tread'
import { useQuery, useQueryClient } from '@tanstack/react-query'

const TREADS_QUERY_KEY = 'get-all-treads'

export const useTreads = () => {
  return useQuery({
    queryKey: [TREADS_QUERY_KEY],
    queryFn: () => treadService.getTreads(),
  })
}

export const useInvalidateTreads = () => {
  const queryClient = useQueryClient()

  return () => {
    queryClient.invalidateQueries({ queryKey: [TREADS_QUERY_KEY] })
  }
}
