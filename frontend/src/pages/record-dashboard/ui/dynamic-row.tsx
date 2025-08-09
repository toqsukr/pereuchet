import { useProducts } from '@entities/product'
import type { TRecord } from '@entities/record'
import { useWorkers } from '@entities/worker'
import { TableCell } from '@features/editable-table'
import DeleteRestoreButton from '@shared/uikit/delete-restore-button'
import Input from '@shared/uikit/input'
import cn from 'classnames'
import { useMemo, useState, type FC } from 'react'
import { Controller, type Control, type UseFormSetValue } from 'react-hook-form'
import { CellSelect } from './cell-select'

type TRecordWithoutDeleted = Omit<TRecord, 'isDeleted'>

export type DynamicRowProps = {
  record: TRecordWithoutDeleted
  control: Control<Record<string, TRecord>>
  setFormState: UseFormSetValue<Record<string, TRecord>>
}

const DynamicRow: FC<DynamicRowProps> = ({ record, control, setFormState }) => {
  const { data: workers } = useWorkers()
  const { data: products } = useProducts()

  const [isDeleted, setIsDeleted] = useState(false)
  const handleToggleDelete = (value: boolean) => {
    setFormState(`${record.id}.isDeleted`, !value, { shouldDirty: true })
    setIsDeleted(!value)
  }

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

  return (
    <>
      <TableCell>
        <div
          className={cn('w-full flex justify-between items-center', {
            ['line-through text-[#ffffff99]']: isDeleted,
          })}>
          <Controller
            control={control}
            name={`${record.id}.id`}
            defaultValue={record.id}
            render={() => <>{record.id}</>}
          />
          <Controller
            control={control}
            name={`${record.id}.isDeleted`}
            defaultValue={isDeleted}
            render={({ field: { value, ...rest } }) => (
              <DeleteRestoreButton
                {...rest}
                checked={value}
                onToggle={() => handleToggleDelete(value)}
              />
            )}
          />
        </div>
      </TableCell>
      <Controller
        control={control}
        name={`${record.id}.createdAt`}
        defaultValue={record.createdAt}
        render={() => (
          <TableCell
            className={cn({
              ['line-through text-[#ffffff99]']: isDeleted,
            })}>
            {record.createdAt}
          </TableCell>
        )}
      />
      <Controller
        control={control}
        name={`${record.id}.createdBy`}
        defaultValue={record.createdBy}
        render={() => (
          <TableCell
            className={cn({
              ['line-through text-[#ffffff99]']: isDeleted,
            })}>
            {record.createdBy}
          </TableCell>
        )}
      />
      <Controller
        control={control}
        name={`${record.id}.editedAt`}
        defaultValue={record.editedAt}
        render={() => (
          <TableCell
            className={cn({
              ['line-through text-[#ffffff99]']: isDeleted,
            })}>
            {record.editedAt}
          </TableCell>
        )}
      />
      <Controller
        control={control}
        name={`${record.id}.editedBy`}
        defaultValue={record.editedBy}
        render={() => (
          <TableCell
            className={cn({
              ['line-through text-[#ffffff99]']: isDeleted,
            })}>
            {record.editedBy}
          </TableCell>
        )}
      />
      <Controller
        control={control}
        name={`${record.id}.workerID`}
        defaultValue={record.workerID}
        render={({ field, fieldState }) => (
          <CellSelect
            {...field}
            disabled={isDeleted}
            className={cn({
              ['bg-emerald-400!']: fieldState.isDirty,
              ['line-through! text-[#ffffff99]!']: isDeleted,
            })}
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
            disabled={isDeleted}
            className={cn({
              ['bg-emerald-400!']: fieldState.isDirty,
              ['line-through! text-[#ffffff99]!']: isDeleted,
            })}
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
            disabled={isDeleted}
            className={cn(
              'h-full! border-r-2 border-b-2 border-[var(--background-color)] bg-[var(--content-field-color)]! rounded-none! transition-colors',
              {
                ['bg-emerald-400!']: fieldState.isDirty,
                ['bg-red-400!']: !!fieldState.error?.message,
                ['line-through! text-[#ffffff99]!']: isDeleted,
              }
            )}
          />
        )}
      />
    </>
  )
}

export default DynamicRow
