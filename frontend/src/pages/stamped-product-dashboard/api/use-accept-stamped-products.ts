import {
  equalStampedProducts,
  type TStampedProduct,
  useInvalidateStampedProducts,
  useStampedProducts,
} from '@entities/stamped-product'
import { stampedProductService } from '@shared/api/stamped-product'
import { useIsMutating, useMutation } from '@tanstack/react-query'

const ACCEPT_PRODUCT_MUTATION_KEY = 'accept-stamped-products'

export const useAcceptStampedProducts = () => {
  const invalidateProducts = useInvalidateStampedProducts()
  const { data: serverProducts } = useStampedProducts()

  return useMutation({
    mutationKey: [ACCEPT_PRODUCT_MUTATION_KEY],
    mutationFn: async (data: Record<string, TStampedProduct>) => {
      const productsToUpdate = serverProducts?.reduce((resultProducts, serverProduct) => {
        const clientProduct = data[serverProduct.id]
        if (equalStampedProducts(serverProduct, clientProduct)) return resultProducts
        const { createdAt, createdBy, editedAt, editedBy, ...rest } = clientProduct
        return [...resultProducts, rest]
      }, [] as Omit<TStampedProduct, 'createdAt' | 'createdBy' | 'editedAt' | 'editedBy'>[])

      await stampedProductService.massUpdateProducts(productsToUpdate ?? [])
      await invalidateProducts()
    },
  })
}

export const useIsStampedProductsSaving = () => {
  const isProductsSaving = useIsMutating({ mutationKey: [ACCEPT_PRODUCT_MUTATION_KEY] })

  return !!isProductsSaving
}
