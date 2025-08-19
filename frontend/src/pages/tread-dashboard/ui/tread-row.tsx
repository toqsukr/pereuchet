import type { TTread } from '@entities/tread'
import { TableCell, useIsEditing } from '@features/editable-table'
import DeleteRestoreButton from '@shared/uikit/delete-restore-button'
import Input from '@shared/uikit/input'
import cn from 'classnames'
import { useState, type FC } from 'react'
import { Controller, type Control, type UseFormSetValue } from 'react-hook-form'
import type { TTreadShownData } from '../model/type'

type StaticRowProps = {
  data: TTreadShownData
}

type EditableRowProps = {
  tread: TTreadShownData
  control: Control<Record<string, TTread>>
  setFormState: UseFormSetValue<Record<string, TTread>>
}

type TreadRowProps = EditableRowProps

// dayjs(date).format('DD.MM.YYYY HH:mm:ss')

export const TreadRow = (props: TreadRowProps) => {
  const isEditing = useIsEditing()

  if (!isEditing) return <StaticRow data={props.tread} />

  return <EditableRow {...props} />
}

const StaticRow: FC<StaticRowProps> = ({ data }) => {
  return Object.keys(data).map(key => {
    const treadKey = key as keyof TTreadShownData
    return <TableCell key={treadKey}>{data[treadKey]}</TableCell>
  })
}

const EditableRow: FC<EditableRowProps> = ({ tread, control, setFormState }) => {
  const [isDeleted, setIsDeleted] = useState(false)
  const handleToggleDelete = (value: boolean) => {
    setFormState(`${tread.code}.isDeleted`, !value, { shouldDirty: true })
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
            name={`${tread.code}.code`}
            defaultValue={tread.code}
            render={() => <>{tread.code}</>}
          />
          <Controller
            control={control}
            name={`${tread.code}.isDeleted`}
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
        name={`${tread.code}.name`}
        defaultValue={tread.name}
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
