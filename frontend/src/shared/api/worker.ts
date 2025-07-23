import { z } from 'zod'
import authTemplate from './auth-template'

const WorkerSchema = z.object({
  id: z.number(),
  name: z.string(),
})

export const workerService = {
  async getWorkers() {
    return authTemplate.get('/worker').then(({ data }) => WorkerSchema.array().parse(data))
  },
} as const
