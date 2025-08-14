import { useRecords, type TRecord } from '@entities/record'
import { DateFilter, useFilterByCreation } from '@features/date-filter'
import { useEditRecords } from '@features/edit-records'
import { EditableTable } from '@features/editable-table'
import { zodResolver } from '@hookform/resolvers/zod'
import { arrayToRecordWithID } from '@shared/lib/transform'
import { useCallback, useEffect, useMemo } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { useTableRecords } from './model/use-table-records'
import './styles.scss'
import ControlPanel from './ui/control-panel'
import { RecordRow } from './ui/record-row'

const tableLabels = [
  'ID',
  'Создан',
  'Создатель',
  'Изменен',
  'Редактор',
  'Штамповщик',
  'Тип',
  'Количество',
] as const

const columnSizes = {
  0: { min: '8rem', max: '8.5rem' },
  1: { min: '12rem', max: '28rem' },
  2: { min: '7rem', max: '10rem' },
  3: { min: '12rem', max: '28rem' },
  4: { min: '7rem', max: '10rem' },
  5: { min: '8rem', max: '10rem' },
  6: { min: '12rem', max: '28rem' },
  7: { min: '7.5rem', max: '10rem' },
} as const

const RecordFormSchema = z.record(
  z.object({
    id: z.coerce.number(),
    createdAt: z.string(),
    createdBy: z.string(),
    editedAt: z.string(),
    editedBy: z.string(),
    workerID: z.coerce.number().min(1),
    productCode: z.string().min(1),
    isDeleted: z.boolean(),
    amount: z.coerce.number().positive().int().max(5000),
  })
)

// dayjs(date).format('DD.MM.YYYY HH:mm:ss')

const RecordDashboard = () => {
  const { updateIsEditing } = useEditRecords()
  const { data: records } = useRecords()
  const filteredData = useFilterByCreation(records)

  useEffect(() => {
    return () => {
      updateIsEditing(false)
    }
  }, [])

  const formSettings = useForm({
    mode: 'onChange',
    resolver: zodResolver(RecordFormSchema),
    defaultValues: arrayToRecordWithID(filteredData),
  })

  const tableData = useTableRecords(filteredData)

  const memoizedControl = useMemo(() => formSettings.control, [formSettings.control])
  const memoizedSetFormState = useCallback(formSettings.setValue, [formSettings.setValue])

  const memoizedGetCells = useCallback(
    (_row: number, value: Omit<TRecord, 'isDeleted'>) => (
      <RecordRow
        key={value.id}
        record={value}
        control={memoizedControl}
        setFormState={memoizedSetFormState}
      />
    ),
    [memoizedControl, memoizedSetFormState, formSettings]
  )

  return (
    <div className='flex flex-col gap-4 w-full h-full justify-self-center max-w-[1650px] px-6'>
      <div className='w-full flex gap-4'>
        <DateFilter />
        <ControlPanel
          formSettings={formSettings}
          exportData={filteredData}
          tableData={filteredData}
        />
      </div>
      <div className='flex h-full w-full gap-12 pb-2 rounded-2xl'>
        <EditableTable
          data={tableData}
          columnSizes={columnSizes}
          columnLabels={tableLabels}
          getCells={memoizedGetCells}
        />
      </div>
    </div>
  )
}

export default RecordDashboard

export { useIsRecordsSaving } from './api/use-save-editing'
