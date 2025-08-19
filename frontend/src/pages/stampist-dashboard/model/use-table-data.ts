import type { TStampist } from '@entities/stampist'
import { useMemo } from 'react'

export const useTableData = (products: TStampist[] | undefined) => {
  return useMemo(
    () =>
      products?.map(({ id, name }) => ({
        id,
        name,
      })),
    [products]
  )
}
