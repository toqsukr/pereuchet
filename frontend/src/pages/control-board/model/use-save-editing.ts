import type { TRecord } from '@entities/record'
import { recordService } from '@shared/api/record'
import { useMutation } from '@tanstack/react-query'

const SAVE_EDITING_MUTATION_KEY = 'save-editing-records'

export const useSaveEditing = () => {
  return useMutation({
    mutationKey: [SAVE_EDITING_MUTATION_KEY],
    mutationFn: (data: Record<string, TRecord>) => {
      const records = Object.values(data)
      return recordService.massUpdateRecords(
        records.map(({ date, ...rest }) => ({ ...rest, date: new Date(date) }))
      )
    },
  })
}
