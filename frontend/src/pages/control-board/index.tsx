import { useInvalidateRecords, useRecords, type TRecord } from '@entities/record'
import { ControlTable } from '@features/control-table'
import { ClearFilterButton, DateFilter, useFilteredData } from '@features/date-filter'
import {
  CancelChangesButton,
  ConfirmChangesButton,
  ToggleEditButton,
  useEditRecords,
} from '@features/edit-records'
import { zodResolver } from '@hookform/resolvers/zod'
import { arrayToRecordWithID } from '@shared/lib/transform'
import { useCallback, useEffect, useMemo } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { useSaveEditing } from './api/use-save-editing'
import './styles.scss'
import ExportRecordsButton from './ui/export-records-button'
import { RecordRow } from './ui/record-row'

const columnLabels = ['ID', 'Дата', 'Штамповщик', 'Тип', 'Количество'] as const

const RecordFormSchema = z.record(
  z.object({
    id: z.coerce.number(),
    date: z.string(),
    workerID: z.coerce.number(),
    productCode: z.string(),
    amount: z.coerce.number().min(1),
  })
)

// dayjs(date).format('DD.MM.YYYY HH:mm:ss')

const ControlBoardPage = () => {
  const { updateIsEditing } = useEditRecords()
  const { data: records } = useRecords()
  const invalidateRecords = useInvalidateRecords()
  const filteredData = useFilteredData(records)
  const { mutateAsync: saveEditing } = useSaveEditing()

  useEffect(() => {
    return () => {
      updateIsEditing(false)
    }
  }, [])

  const tableData = useMemo(
    () =>
      filteredData?.map(({ productCode, amount, date, id, workerID }) => ({
        id,
        date,
        workerID,
        productCode,
        amount,
      })),
    [filteredData]
  )

  const formSettings = useForm({
    mode: 'onChange',
    resolver: zodResolver(RecordFormSchema),
    defaultValues: arrayToRecordWithID(tableData),
  })

  const memoizedControl = useMemo(() => formSettings.control, [formSettings.control])

  const memoizedGetCells = useCallback(
    (_row: number, value: TRecord) => (
      <RecordRow key={value.id} record={value} control={memoizedControl} />
    ),
    [memoizedControl]
  )

  const onValidSubmit = async (data: Record<string, TRecord>) => {
    await saveEditing(data)
    formSettings.reset(data)
    invalidateRecords()
  }

  return (
    <div className='flex flex-col gap-4 w-full h-full justify-self-center max-w-[1444px] px-6 overflow-auto'>
      <div className='w-full min-w-[840px] flex gap-4'>
        <DateFilter />
        <section className='flex gap-4 ml-auto bg-[var(--content-field-color)] p-4 rounded-2xl'>
          <ClearFilterButton />
          <ToggleEditButton />
          <ConfirmChangesButton
            disabled={!formSettings.formState.isValid}
            fieldChanged={formSettings.formState.isDirty}
            onConfirm={formSettings.handleSubmit(onValidSubmit)}
            onCancel={() => formSettings.reset(arrayToRecordWithID(tableData))}
          />
          <CancelChangesButton
            onCancel={() => formSettings.reset(arrayToRecordWithID(tableData))}
          />
          <ExportRecordsButton columnLabels={columnLabels} records={filteredData} />
        </section>
      </div>
      <div className='flex h-full w-full min-w-[840px] gap-12 pb-2 rounded-2xl'>
        <ControlTable data={tableData} columnLabels={columnLabels} getCells={memoizedGetCells} />
      </div>
    </div>
  )
}

export default ControlBoardPage

export { useIsRecordsSaving } from './api/use-save-editing'
