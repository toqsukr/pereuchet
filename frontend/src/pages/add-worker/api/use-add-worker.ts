import { workerService } from '@shared/api/worker'
import { useMutation } from '@tanstack/react-query'

const ADD_WORKER_MUTATION_KEY = 'add-worker'

export const useAddWorker = () => {
  return useMutation({
    mutationKey: [ADD_WORKER_MUTATION_KEY],
    mutationFn: (data: { id: number; name: string }) => workerService.createWorker(data),
  })
}
