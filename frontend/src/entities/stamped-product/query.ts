import { stampedProductService } from '@shared/api/stamped-product'
import { useQuery, useQueryClient } from '@tanstack/react-query'

const STAMPED_PRODUCT_QUERY_KEY = 'get-all-stamped-products'

export const useStampedProducts = () => {
  return useQuery({
    queryKey: [STAMPED_PRODUCT_QUERY_KEY],
    queryFn: () =>
      stampedProductService.getProducts().then(arr =>
        arr.map(({ id, createdAt, editedAt, ...fields }) => ({
          id,
          createdAt: createdAt.toISOString().slice(0, -5),
          editedAt: editedAt.toISOString().slice(0, -5),
          isDeleted: false,
          ...fields,
        }))
      ),
    refetchInterval: 30 * 1000, // 30sec
  })
}

export const useInvalidateStampedProducts = () => {
  const queryClient = useQueryClient()

  return () => queryClient.invalidateQueries({ queryKey: [STAMPED_PRODUCT_QUERY_KEY] })
}
