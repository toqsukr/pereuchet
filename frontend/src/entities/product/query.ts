import { productService } from '@shared/api/product'
import { useQuery } from '@tanstack/react-query'

const PRODUCTS_QUERY_KEY = 'get-all-products'

export const useProducts = () => {
  return useQuery({
    queryKey: [PRODUCTS_QUERY_KEY],
    queryFn: () => productService.getProducts(),
    refetchInterval: 30 * 1000, // 30sec
  })
}
