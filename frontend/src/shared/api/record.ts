import { z } from 'zod'
import authTemplate from './auth-template'
import baseTemplate from './base-template'

export const RecordSchemaDTO = z.object({
  id: z.number(),
  date: z.coerce.date(),
  workerID: z.coerce.number().min(1),
  productCode: z.string().min(1),
  amount: z.coerce.number().positive().int().max(5000),
})

type RecordDTO = z.infer<typeof RecordSchemaDTO>

const RECORD_PREFIX = '/record'

export const recordService = {
  async getRecords() {
    return authTemplate.get(RECORD_PREFIX).then(({ data }) => RecordSchemaDTO.array().parse(data))
  },

  async saveRecord(recordData: Omit<RecordDTO, 'id' | 'date'>) {
    return baseTemplate
      .post(RECORD_PREFIX, recordData)
      .then(({ data }) => RecordSchemaDTO.parse(data))
  },
} as const
