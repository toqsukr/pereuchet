import { useInvalidateTreads, useTreads, type TTread } from '@entities/tread'
import { equalTreads } from '@entities/tread/equal-treads'
import { treadService } from '@shared/api/tread'
import { useIsMutating, useMutation } from '@tanstack/react-query'

const MASS_UPDATE_TREADS_MUTATION_KEY = 'mass-update-treads'

export const useUpdateTreads = () => {
  const invalidateTreads = useInvalidateTreads()
  const { data: serverTreads } = useTreads()

  return useMutation({
    mutationKey: [MASS_UPDATE_TREADS_MUTATION_KEY],
    mutationFn: async (data: Record<string, TTread>) => {
      const treadsToUpdate = serverTreads?.reduce((resultTread, serverTread) => {
        const clientTread = data[serverTread.code]
        if (equalTreads(serverTread, clientTread)) return resultTread
        return [...resultTread, clientTread]
      }, [] as TTread[])

      await treadService.massUpdateTreads(treadsToUpdate ?? [])
      await invalidateTreads()
    },
  })
}

export const useIsTreadsUpdating = () => {
  const isTreadsUpdating = useIsMutating({ mutationKey: [MASS_UPDATE_TREADS_MUTATION_KEY] })

  return !!isTreadsUpdating
}
