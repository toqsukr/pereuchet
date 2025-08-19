import type { TTread } from '@entities/tread'
import { useMemo } from 'react'

export const useTableData = (treads: TTread[] | undefined) => {
  return useMemo(
    () =>
      treads?.map(({ code, name }) => ({
        code,
        name,
      })),
    [treads]
  )
}
