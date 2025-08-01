import { equalRecords, useInvalidateRecords, useRecords, type TRecord } from '@entities/record'
import { recordService } from '@shared/api/record'
import { useIsMutating, useMutation } from '@tanstack/react-query'

const SAVE_EDITING_MUTATION_KEY = 'save-editing-records'

export const useSaveEditing = () => {
  const invalidateRecords = useInvalidateRecords()
  const { data: serverRecords } = useRecords()

  return useMutation({
    mutationKey: [SAVE_EDITING_MUTATION_KEY],
    mutationFn: async (data: Record<string, TRecord>) => {
      const recordsToUpdate = serverRecords?.reduce((resultRecords, serverRecord) => {
        const clientRecord = data[serverRecord.id]
        if (equalRecords(serverRecord, clientRecord)) return resultRecords
        return [...resultRecords, clientRecord]
      }, [] as TRecord[])

      await recordService.massUpdateRecords(recordsToUpdate ?? [])
      await invalidateRecords()
    },
  })
}

export const useIsRecordsSaving = () => {
  const isRecordsSaving = useIsMutating({ mutationKey: [SAVE_EDITING_MUTATION_KEY] })

  return !!isRecordsSaving
}
