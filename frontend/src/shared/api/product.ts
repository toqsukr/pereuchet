import { z } from 'zod'
import baseTemplate from './base-template'

const ProductSchema = z.object({
  code: z.string().min(1),
  name: z.string(),
})

export const productService = {
  async getProducts() {
    return baseTemplate.get('/product').then(({ data }) => ProductSchema.array().parse(data))
  },
} as const
