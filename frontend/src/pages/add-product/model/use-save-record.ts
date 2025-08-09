import { recordService } from '@shared/api/record'
import { useMutation } from '@tanstack/react-query'

const SAVE_RECORD_MUTATION_KEY = 'save-record'

export const useSaveRecord = () => {
  return useMutation({
    mutationKey: [SAVE_RECORD_MUTATION_KEY],
    mutationFn: (data: { workerID: number; productCode: string; amount: number }) => {
      return recordService.saveRecord(data)
    },
  })
}
