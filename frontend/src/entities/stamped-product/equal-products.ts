import type { TStampedProduct } from './type'

export function equalStampedProducts(product1: TStampedProduct, product2: TStampedProduct) {
  return Object.keys(product1).every(key => {
    const productKey = key as keyof TStampedProduct
    return product1[productKey] === product2[productKey]
  })
}
