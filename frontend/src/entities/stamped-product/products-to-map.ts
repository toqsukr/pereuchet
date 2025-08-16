import type { TStampedProduct } from './type'

export const productsToMap = (products: TStampedProduct[] | undefined) => {
  return products?.reduce(
    (acc, cur) => acc.set(cur.id, cur),
    new Map<TStampedProduct['id'], TStampedProduct>()
  )
}
