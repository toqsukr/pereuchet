import { useInvalidateStampists, useStampists, type TStampist } from '@entities/stampist'
import { equalStampists } from '@entities/stampist/equal-stampists'
import { stampistService } from '@shared/api/stampist'
import { useIsMutating, useMutation } from '@tanstack/react-query'

const MASS_UPDATE_STAMPISTS_MUTATION_KEY = 'mass-update-stampists'

export const useUpdateStampists = () => {
  const invalidateStampists = useInvalidateStampists()
  const { data: serverStampists } = useStampists()

  return useMutation({
    mutationKey: [MASS_UPDATE_STAMPISTS_MUTATION_KEY],
    mutationFn: async (data: Record<string, TStampist>) => {
      const stampistsToUpdate = serverStampists?.reduce((resultStampists, serverStampist) => {
        const clientStampist = data[serverStampist.id]
        if (equalStampists(serverStampist, clientStampist)) return resultStampists
        return [...resultStampists, clientStampist]
      }, [] as TStampist[])

      await stampistService.massUpdateStampists(stampistsToUpdate ?? [])
      await invalidateStampists()
    },
  })
}

export const useIsStampistsUpdating = () => {
  const isProductsSaving = useIsMutating({ mutationKey: [MASS_UPDATE_STAMPISTS_MUTATION_KEY] })

  return !!isProductsSaving
}
