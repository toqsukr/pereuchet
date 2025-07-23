import { useProductByCode, useProducts } from '@entities/product'
import type { TRecord } from '@entities/record'
import { useWorkers } from '@entities/worker'
import { TableCell } from '@features/control-table'
import { useEditRecords } from '@features/edit-records'
import Input from '@shared/uikit/input'
import { useMemo, type FC } from 'react'
import { CellSelect } from './cell-select'

type RecordRowProps = {
  record: TRecord
  saveRecord: (record: TRecord) => void
}

export const RecordRow: FC<RecordRowProps> = ({ record, saveRecord }) => {
  const { data: workers } = useWorkers()
  const { data: products } = useProducts()
  const { isEditing } = useEditRecords()
  const getProductByCode = useProductByCode()

  const handleSaveRecord = <K extends keyof TRecord>(k: K, v: TRecord[K]) => {
    saveRecord({ ...record, [k]: v })
  }

  const workerOptions = useMemo(
    () =>
      (workers ?? []).map(worker => ({
        value: worker.id,
        children: worker.id,
      })),
    [workers, record.workerID]
  )

  const productOptions = useMemo(
    () =>
      (products ?? []).map(product => ({
        value: product.code,
        children: product.name,
      })),
    [products, record.productCode]
  )

  if (!isEditing)
    return ['id', 'date', 'workerID', 'productCode', 'amount'].map(key => {
      const recordKey = key as keyof TRecord
      return (
        <TableCell key={recordKey}>
          {recordKey === 'productCode'
            ? getProductByCode(record[recordKey])?.name
            : record[recordKey]}
        </TableCell>
      )
    })

  return (
    <>
      <TableCell>{record.id}</TableCell>
      <TableCell>{record.date}</TableCell>
      <CellSelect
        options={workerOptions}
        defaultValue={record.workerID}
        onChange={e => handleSaveRecord('workerID', parseInt(e.currentTarget.value))}
      />
      <CellSelect
        options={productOptions}
        defaultValue={record.productCode}
        onChange={e => handleSaveRecord('productCode', e.currentTarget.value)}
      />
      <Input
        onChange={e => handleSaveRecord('amount', parseInt(e.currentTarget.value))}
        className='h-full! border-r-2 border-b-2 border-[var(--background-color)] bg-[var(--content-field-color)]! rounded-none!'
        value={record.amount}
      />
    </>
  )
}
