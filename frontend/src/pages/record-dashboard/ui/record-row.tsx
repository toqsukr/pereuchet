import { useProductByCode, useProducts } from '@entities/product'
import type { TRecord } from '@entities/record'
import { useWorkers } from '@entities/worker'
import { useEditRecords } from '@features/edit-records'
import { TableCell } from '@features/editable-table'
import Input from '@shared/uikit/input'
import classNames from 'classnames'
import { useMemo } from 'react'
import { Controller, type Control, type FieldValues } from 'react-hook-form'
import { CellSelect } from './cell-select'

type RecordRowProps<
  TFieldValues extends FieldValues,
  TContext = any,
  TTransformedValues = TFieldValues
> = {
  record: TRecord
  control: Control<TFieldValues, TContext, TTransformedValues>
}

export const RecordRow = ({ record, control }: RecordRowProps<Record<string, TRecord>>) => {
  const { data: workers } = useWorkers()
  const { data: products } = useProducts()
  const { isEditing } = useEditRecords()
  const getProductByCode = useProductByCode()

  const workerOptions = useMemo(
    () =>
      (workers ?? []).map(worker => ({
        value: worker.id,
        children: worker.id,
      })),
    [workers]
  )

  const productOptions = useMemo(
    () =>
      (products ?? []).map(product => ({
        value: product.code,
        children: product.name,
      })),
    [products]
  )

  if (!isEditing)
    return Object.keys(record).map(key => {
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
      <Controller
        control={control}
        name={`${record.id}.id`}
        defaultValue={record.id}
        render={() => <TableCell>{record.id}</TableCell>}
      />
      <Controller
        control={control}
        name={`${record.id}.createdAt`}
        defaultValue={record.createdAt}
        render={() => <TableCell>{record.createdAt}</TableCell>}
      />
      <Controller
        control={control}
        name={`${record.id}.createdBy`}
        defaultValue={record.createdBy}
        render={() => <TableCell>{record.createdBy}</TableCell>}
      />
      <Controller
        control={control}
        name={`${record.id}.editedAt`}
        defaultValue={record.editedAt}
        render={() => <TableCell>{record.editedAt}</TableCell>}
      />
      <Controller
        control={control}
        name={`${record.id}.editedBy`}
        defaultValue={record.editedBy}
        render={() => <TableCell>{record.editedBy}</TableCell>}
      />
      <Controller
        control={control}
        name={`${record.id}.workerID`}
        defaultValue={record.workerID}
        render={({ field, fieldState }) => (
          <CellSelect
            {...field}
            className={classNames({ ['bg-emerald-400!']: fieldState.isDirty })}
            options={workerOptions}
          />
        )}
      />
      <Controller
        control={control}
        name={`${record.id}.productCode`}
        defaultValue={record.productCode}
        render={({ field, fieldState }) => (
          <CellSelect
            {...field}
            className={classNames({ ['bg-emerald-400!']: fieldState.isDirty })}
            options={productOptions}
          />
        )}
      />
      <Controller
        control={control}
        name={`${record.id}.amount`}
        defaultValue={record.amount}
        render={({ field, fieldState }) => (
          <Input
            {...field}
            type='tel'
            className={classNames(
              'h-full! border-r-2 border-b-2 border-[var(--background-color)] bg-[var(--content-field-color)]! rounded-none! transition-colors',
              {
                ['bg-emerald-400!']: fieldState.isDirty,
                ['bg-red-400!']: !!fieldState.error?.message,
              }
            )}
          />
        )}
      />
    </>
  )
}
