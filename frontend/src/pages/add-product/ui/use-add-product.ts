import { productService } from '@shared/api/product'
import { useMutation } from '@tanstack/react-query'

const ADD_PRODUCT_MUTATION_KEY = 'add-product'

export const useAddProduct = () => {
  return useMutation({
    mutationKey: [ADD_PRODUCT_MUTATION_KEY],
    mutationFn: (data: { code: string; name: string }) => productService.createProduct(data),
  })
}
