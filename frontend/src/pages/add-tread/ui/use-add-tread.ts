import { treadService } from '@shared/api/tread'
import { useMutation } from '@tanstack/react-query'

const ADD_TREAD_MUTATION_KEY = 'add-tread'

export const useAddTread = () => {
  return useMutation({
    mutationKey: [ADD_TREAD_MUTATION_KEY],
    mutationFn: (data: { code: string; name: string }) => treadService.createTread(data),
  })
}
