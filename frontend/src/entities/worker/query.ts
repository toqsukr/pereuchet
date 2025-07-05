import { workerService } from '@shared/api/worker'
import { useQuery } from '@tanstack/react-query'

const WORKERS_QUERY_KEY = 'get-all-workers'

export const useWorkers = () => {
  return useQuery({
    queryKey: [WORKERS_QUERY_KEY],
    queryFn: () => workerService.getWorkers(),
    refetchInterval: 30 * 1000, // 30sec
  })
}
