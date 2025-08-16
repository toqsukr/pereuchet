import { stampistService } from '@shared/api/stampist'
import { useMutation } from '@tanstack/react-query'

const ADD_STAMPIST_MUTATION_KEY = 'add-stampist'

export const useAddStampist = () => {
  return useMutation({
    mutationKey: [ADD_STAMPIST_MUTATION_KEY],
    mutationFn: (data: { id: number; name: string }) => stampistService.createStampist(data),
  })
}
