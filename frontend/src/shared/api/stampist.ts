import { z } from 'zod'
import authTemplate from './auth-template'

const STAMPIST_PREFIX = '/stampist'

const StampistSchema = z.object({
  id: z.number(),
  name: z.string(),
})

type StampistDTO = z.infer<typeof StampistSchema>

export const stampistService = {
  async getStampists() {
    return authTemplate.get(STAMPIST_PREFIX).then(({ data }) => StampistSchema.array().parse(data))
  },

  async createStampist(data: { id: number; name: string }) {
    return authTemplate.post(STAMPIST_PREFIX, { ...data })
  },

  async massUpdateStampists(stampists: StampistDTO[]) {
    return authTemplate.put(`${STAMPIST_PREFIX}/mass-update`, { stampists })
  },

  async deleteStampist(id: number) {
    return authTemplate.delete(STAMPIST_PREFIX, { params: { id } })
  },
} as const
