import type { TRecord } from '@entities/record'
import { useMemo } from 'react'

export const useTableRecords = (records: TRecord[] | undefined) => {
  return useMemo(
    () =>
      records?.map(
        ({ productCode, amount, createdAt, createdBy, editedAt, editedBy, id, workerID }) => ({
          id,
          createdAt,
          createdBy,
          editedAt,
          editedBy,
          workerID,
          productCode,
          amount,
        })
      ),
    [records]
  )
}
