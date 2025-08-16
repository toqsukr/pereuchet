import { stampedProductService } from '@shared/api/stamped-product'
import { useMutation } from '@tanstack/react-query'

const ACCEPT_PRODUCT_MUTATION_KEY = 'accept-stamped-product'

export const useAcceptProduct = () => {
  return useMutation({
    mutationKey: [ACCEPT_PRODUCT_MUTATION_KEY],
    mutationFn: (data: { stampistID: number; treadCode: string; amount: number }) => {
      return stampedProductService.acceptProduct(data)
    },
  })
}
