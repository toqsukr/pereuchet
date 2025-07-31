import { useInvalidateRecords, type TRecord } from '@entities/record'
import { recordService } from '@shared/api/record'
import { useIsMutating, useMutation } from '@tanstack/react-query'

const SAVE_EDITING_MUTATION_KEY = 'save-editing-records'

export const useSaveEditing = () => {
  const invalidateRecords = useInvalidateRecords()

  return useMutation({
    mutationKey: [SAVE_EDITING_MUTATION_KEY],
    mutationFn: async (data: Record<string, TRecord>) => {
      const records = Object.values(data)
      await recordService.massUpdateRecords(
        records.map(({ date, ...rest }) => ({ ...rest, date: new Date(date) }))
      )
      await invalidateRecords()
    },
  })
}

export const useIsRecordsSaving = () => {
  const isRecordsSaving = useIsMutating({ mutationKey: [SAVE_EDITING_MUTATION_KEY] })

  return !!isRecordsSaving
}
