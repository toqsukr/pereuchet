import { useProducts } from './query'

export const useProductByCode = () => {
  const { data: products } = useProducts()

  return (productCode: string) => products?.find(({ code }) => code === productCode)
}
