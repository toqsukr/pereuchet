import { stampistService } from '@shared/api/stampist'
import { useQuery, useQueryClient } from '@tanstack/react-query'

const STAMPISTS_QUERY_KEY = 'get-all-stampists'

export const useStampists = () => {
  return useQuery({
    queryKey: [STAMPISTS_QUERY_KEY],
    queryFn: () => stampistService.getStampists(),
  })
}

export const useInvalidateStampists = () => {
  const queryClient = useQueryClient()

  return () => {
    queryClient.invalidateQueries({ queryKey: [STAMPISTS_QUERY_KEY] })
  }
}
