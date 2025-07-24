import { z } from 'zod'
import authTemplate from './auth-template'

const WORKER_PREFIX = '/worker'

const WorkerSchema = z.object({
  id: z.number(),
  name: z.string(),
})

export const workerService = {
  async getWorkers() {
    return authTemplate.get(WORKER_PREFIX).then(({ data }) => WorkerSchema.array().parse(data))
  },

  async createWorker(data: { id: number; name: string }) {
    return authTemplate.post(WORKER_PREFIX, { ...data })
  },
} as const
