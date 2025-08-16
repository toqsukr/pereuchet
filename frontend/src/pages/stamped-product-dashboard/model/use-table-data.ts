import type { TStampedProduct } from '@entities/stamped-product'
import { useMemo } from 'react'

export const useTableData = (products: TStampedProduct[] | undefined) => {
  return useMemo(
    () =>
      products?.map(({ treadCode, amount, createdAt, createdBy, id, stampistID }) => ({
        id,
        createdAt,
        createdBy,
        stampistID,
        treadCode,
        amount,
      })),
    [products]
  )
}
