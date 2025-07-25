import { z } from 'zod'
import authTemplate from './auth-template'

const PRODUCT_PREFIX = '/product'

const ProductSchema = z.object({
  code: z.string().min(1),
  name: z.string(),
})

export const productService = {
  async getProducts() {
    return authTemplate.get(PRODUCT_PREFIX).then(({ data }) => ProductSchema.array().parse(data))
  },

  async createProduct(data: { code: string; name: string }) {
    return authTemplate.post(PRODUCT_PREFIX, { ...data })
  },

  async deleteProduct(code: string) {
    return authTemplate.delete(PRODUCT_PREFIX, { params: { code } })
  },
} as const
