import { type TStampist } from '@entities/stampist'
import { TableCell, useIsEditing } from '@features/editable-table'
import DeleteRestoreButton from '@shared/uikit/delete-restore-button'
import Input from '@shared/uikit/input'
import cn from 'classnames'
import { useState, type FC } from 'react'
import { Controller, type Control, type UseFormSetValue } from 'react-hook-form'
import type { TStampistShownData } from '../model/type'

type StaticRowProps = {
  data: TStampistShownData
}

type EditableRowProps = {
  stampist: TStampistShownData
  control: Control<Record<string, TStampist>>
  setFormState: UseFormSetValue<Record<string, TStampist>>
}

type StampistRowProps = EditableRowProps

// dayjs(date).format('DD.MM.YYYY HH:mm:ss')

export const StampistRow = (props: StampistRowProps) => {
  const isEditing = useIsEditing()

  if (!isEditing) return <StaticRow data={props.stampist} />

  return <EditableRow {...props} />
}

const StaticRow: FC<StaticRowProps> = ({ data }) => {
  return Object.keys(data).map(key => {
    const stampistKey = key as keyof TStampistShownData
    return <TableCell key={stampistKey}>{data[stampistKey]}</TableCell>
  })
}

const EditableRow: FC<EditableRowProps> = ({ stampist, control, setFormState }) => {
  const [isDeleted, setIsDeleted] = useState(false)
  const handleToggleDelete = (value: boolean) => {
    setFormState(`${stampist.id}.isDeleted`, !value, { shouldDirty: true })
    setIsDeleted(!value)
  }

  return (
    <>
      <TableCell>
        <div
          className={cn('w-full flex justify-between items-center', {
            ['line-through text-[#ffffff99]']: isDeleted,
          })}>
          <Controller
            control={control}
            name={`${stampist.id}.id`}
            defaultValue={stampist.id}
            render={() => <>{stampist.id}</>}
          />
          <Controller
            control={control}
            name={`${stampist.id}.isDeleted`}
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
        name={`${stampist.id}.name`}
        defaultValue={stampist.name}
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
