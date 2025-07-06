import { z } from 'zod'
import baseTemplate from './axios-template'

export const RecordSchemaDTO = z.object({
  workerID: z.coerce.number().min(1),
  productCode: z.string().min(1),
  amount: z.coerce.number().positive().int().max(5000),
})

type RecordDTO = z.infer<typeof RecordSchemaDTO>

const RECORD_PREFIX = '/record'

export const recordService = {
  async saveRecord(recordData: RecordDTO) {
    return baseTemplate
      .post(RECORD_PREFIX, recordData)
      .then(({ data }) => RecordSchemaDTO.parse(data))
  },
} as const
