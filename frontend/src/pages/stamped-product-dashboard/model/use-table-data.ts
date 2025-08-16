import type { TStampedProduct } from '@entities/stamped-product'
import { useMemo } from 'react'

export const useTableData = (products: TStampedProduct[] | undefined) => {
  return useMemo(
    () =>
      products?.map(
        ({ treadCode, amount, createdAt, createdBy, editedAt, editedBy, id, stampistID }) => ({
          id,
          createdAt,
          createdBy,
          editedAt,
          editedBy,
          stampistID,
          treadCode,
          amount,
        })
      ),
    [products]
  )
}
