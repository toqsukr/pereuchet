import { z } from 'zod'
import baseTemplate from './axios-template'

const ProductSchema = z.object({
  name: z.string(),
  value: z.string().min(1),
})

export const productService = {
  async getProducts() {
    return baseTemplate.get('/product').then(({ data }) => ProductSchema.array().parse(data))
  },
} as const
