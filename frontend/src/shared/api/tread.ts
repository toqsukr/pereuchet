import { z } from 'zod'
import authTemplate from './auth-template'

const TREAD_PREFIX = '/tread'

const TreadSchema = z.object({
  code: z.string().min(1),
  name: z.string(),
})

type TreadDTO = z.infer<typeof TreadSchema>

export const treadService = {
  async getTreads() {
    return authTemplate.get(TREAD_PREFIX).then(({ data }) => TreadSchema.array().parse(data))
  },

  async createTread(data: { code: string; name: string }) {
    return authTemplate.post(TREAD_PREFIX, { ...data })
  },

  async massUpdateTreads(treads: TreadDTO[]) {
    return authTemplate.put(`${TREAD_PREFIX}/mass-update`, { treads })
  },

  async deleteTread(code: string) {
    return authTemplate.delete(TREAD_PREFIX, { params: { code } })
  },
} as const
