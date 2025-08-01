import { z } from 'zod'
import authTemplate from './auth-template'

const RECORD_PREFIX = '/record'

export const RecordSchemaDTO = z.object({
  id: z.coerce.number(),
  date: z.coerce.date(),
  workerID: z.coerce.number().min(1),
  productCode: z.string().min(1),
  amount: z.coerce.number().positive().int().max(5000),
})

type RecordDTO = z.infer<typeof RecordSchemaDTO>

export const recordService = {
  async getRecords() {
    return authTemplate.get(RECORD_PREFIX).then(({ data }) => RecordSchemaDTO.array().parse(data))
  },

  async saveRecord(recordData: Omit<RecordDTO, 'id' | 'date'>) {
    return authTemplate
      .post(RECORD_PREFIX, recordData)
      .then(({ data }) => RecordSchemaDTO.parse(data))
  },

  async updateRecord(recordData: Omit<RecordDTO, 'id' | 'date'>) {
    return authTemplate
      .put(RECORD_PREFIX, recordData)
      .then(({ data }) => RecordSchemaDTO.parse(data))
  },

  async massUpdateRecords(records: Omit<RecordDTO, 'date'>[]) {
    return authTemplate.put(`${RECORD_PREFIX}/mass-update`, { records })
  },

  async deleteRecord(id: number) {
    return authTemplate.delete(RECORD_PREFIX, { params: { id } })
  },
} as const
