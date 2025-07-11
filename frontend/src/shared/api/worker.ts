import { z } from 'zod'
import baseTemplate from './base-template'

const WorkerSchema = z.object({
  id: z.number(),
  name: z.string(),
})

export const workerService = {
  async getWorkers() {
    return baseTemplate.get('/worker').then(({ data }) => WorkerSchema.array().parse(data))
  },
} as const
