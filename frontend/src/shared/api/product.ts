import { z } from 'zod'
import authTemplate from './auth-template'

const ProductSchema = z.object({
  code: z.string().min(1),
  name: z.string(),
})

export const productService = {
  async getProducts() {
    return authTemplate.get('/product').then(({ data }) => ProductSchema.array().parse(data))
  },
} as const
