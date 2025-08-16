import { z } from 'zod'
import authTemplate from './auth-template'

const STAMPED_PRODUCT_PREFIX = '/stamped-product'

const StampedProductSchemaDTO = z.object({
  id: z.coerce.number(),
  stampistID: z.coerce.number().min(1),
  treadCode: z.string().min(1),
  amount: z.coerce.number().positive().int().max(5000),
  createdAt: z.coerce.date(),
  createdBy: z.string(),
  editedAt: z.coerce.date(),
  editedBy: z.string(),
})

type StampedProductDTO = z.infer<typeof StampedProductSchemaDTO>

type UpdateProductData = Pick<StampedProductDTO, 'stampistID' | 'treadCode' | 'amount'>

export const stampedProductService = {
  async getProducts() {
    return authTemplate
      .get(STAMPED_PRODUCT_PREFIX)
      .then(({ data }) => StampedProductSchemaDTO.array().parse(data))
  },

  async acceptProduct(productData: UpdateProductData) {
    return authTemplate
      .post(STAMPED_PRODUCT_PREFIX, productData)
      .then(({ data }) => StampedProductSchemaDTO.parse(data))
  },

  async updateProduct(productData: UpdateProductData) {
    return authTemplate
      .put(STAMPED_PRODUCT_PREFIX, productData)
      .then(({ data }) => StampedProductSchemaDTO.parse(data))
  },

  async massUpdateProducts(stampedProducts: (Pick<StampedProductDTO, 'id'> & UpdateProductData)[]) {
    return authTemplate.put(`${STAMPED_PRODUCT_PREFIX}/mass-update`, { stampedProducts })
  },

  async deleteProduct(id: Pick<StampedProductDTO, 'id'>['id']) {
    return authTemplate.delete(STAMPED_PRODUCT_PREFIX, { params: { id } })
  },
} as const
