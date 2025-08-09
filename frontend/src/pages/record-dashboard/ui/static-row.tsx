import { useProductByCode } from '@entities/product'
import type { TRecord } from '@entities/record'
import { TableCell } from '@features/editable-table'
import { type FC } from 'react'

type StaticRowProps = {
  recordData: Omit<TRecord, 'isDeleted'>
}

const StaticRow: FC<StaticRowProps> = ({ recordData }) => {
  const getProductByCode = useProductByCode()

  return Object.keys(recordData).map(key => {
    const recordKey = key as keyof Omit<TRecord, 'isDeleted'>
    return (
      <TableCell key={recordKey}>
        {recordKey === 'productCode'
          ? getProductByCode(recordData[recordKey])?.name
          : recordData[recordKey]}
      </TableCell>
    )
  })
}

export default StaticRow
