import type { TStampedProduct } from '@entities/stamped-product'
import { useStampists } from '@entities/stampist'
import { useTreadByCode, useTreads } from '@entities/tread'
import { TableCell, useIsEditing } from '@features/editable-table'
import DeleteRestoreButton from '@shared/uikit/delete-restore-button'
import Input from '@shared/uikit/input'
import cn from 'classnames'
import { useMemo, useState, type FC } from 'react'
import { Controller, type Control, type UseFormSetValue } from 'react-hook-form'
import { CellSelect } from '../../../features/editable-table/ui/cell-select'
import type { TProductShownData } from '../model/type'

type StaticRowProps = {
  data: TProductShownData
}

type EditableRowProps = {
  product: TProductShownData
  control: Control<Record<string, TStampedProduct>>
  setFormState: UseFormSetValue<Record<string, TStampedProduct>>
}

type ProductRowProps = EditableRowProps

// dayjs(date).format('DD.MM.YYYY HH:mm:ss')

export const ProductRow = (props: ProductRowProps) => {
  const isEditing = useIsEditing()

  if (!isEditing) return <StaticRow data={props.product} />

  return <EditableRow {...props} />
}

const StaticRow: FC<StaticRowProps> = ({ data }) => {
  const getTreadByCode = useTreadByCode()

  return Object.keys(data).map(key => {
    const productKey = key as keyof TProductShownData
    return (
      <TableCell key={productKey}>
        {productKey === 'treadCode' ? getTreadByCode(data[productKey])?.name : data[productKey]}
      </TableCell>
    )
  })
}

const EditableRow: FC<EditableRowProps> = ({ product, control, setFormState }) => {
  const { data: stampists } = useStampists()
  const { data: treads } = useTreads()

  const [isDeleted, setIsDeleted] = useState(false)
  const handleToggleDelete = (value: boolean) => {
    setFormState(`${product.id}.isDeleted`, !value, { shouldDirty: true })
    setIsDeleted(!value)
  }

  const stampistOptions = useMemo(
    () =>
      (stampists ?? []).map(stampist => ({
        value: stampist.id,
        children: stampist.id,
      })),
    [stampists]
  )

  const treadOptions = useMemo(
    () =>
      (treads ?? []).map(tread => ({
        value: tread.code,
        children: tread.name,
      })),
    [treads]
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
            name={`${product.id}.id`}
            defaultValue={product.id}
            render={() => <>{product.id}</>}
          />
          <Controller
            control={control}
            name={`${product.id}.isDeleted`}
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
        name={`${product.id}.createdAt`}
        defaultValue={product.createdAt}
        render={() => (
          <TableCell
            className={cn({
              ['line-through text-[#ffffff99]']: isDeleted,
            })}>
            {product.createdAt}
          </TableCell>
        )}
      />
      <Controller
        control={control}
        name={`${product.id}.createdBy`}
        defaultValue={product.createdBy}
        render={() => (
          <TableCell
            className={cn({
              ['line-through text-[#ffffff99]']: isDeleted,
            })}>
            {product.createdBy}
          </TableCell>
        )}
      />
      <Controller
        control={control}
        name={`${product.id}.stampistID`}
        defaultValue={product.stampistID}
        render={({ field, fieldState }) => (
          <CellSelect
            {...field}
            disabled={isDeleted}
            className={cn({
              ['bg-emerald-400!']: fieldState.isDirty,
              ['line-through! text-[#ffffff99]!']: isDeleted,
            })}
            options={stampistOptions}
          />
        )}
      />
      <Controller
        control={control}
        name={`${product.id}.treadCode`}
        defaultValue={product.treadCode}
        render={({ field, fieldState }) => (
          <CellSelect
            {...field}
            disabled={isDeleted}
            className={cn({
              ['bg-emerald-400!']: fieldState.isDirty,
              ['line-through! text-[#ffffff99]!']: isDeleted,
            })}
            options={treadOptions}
          />
        )}
      />
      <Controller
        control={control}
        name={`${product.id}.amount`}
        defaultValue={product.amount}
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
