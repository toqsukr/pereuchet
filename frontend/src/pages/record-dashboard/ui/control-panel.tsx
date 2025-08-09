import { useInvalidateRecords, type TRecord } from '@entities/record'
import { ClearFilterButton } from '@features/date-filter'
import { CancelChangesButton, ConfirmChangesButton, ToggleEditButton } from '@features/edit-records'
import { arrayToRecordWithID } from '@shared/lib/transform'
import type { FieldValues, UseFormReturn } from 'react-hook-form'
import { useSaveEditing } from '../api/use-save-editing'
import ExportRecordsButton from './export-records-button'

const exportLabels = ['ID', 'Создан', 'Штамповщик', 'Тип', 'Количество'] as const

type ControlPanelProps<TFieldValues extends FieldValues> = {
  formSettings: UseFormReturn<TFieldValues>
  tableData: TRecord[] | undefined
  exportData: TRecord[] | undefined
}

const ControlPanel = (props: ControlPanelProps<Record<string, TRecord>>) => {
  const { formSettings, exportData, tableData } = props
  const invalidateRecords = useInvalidateRecords()
  const { mutateAsync: saveEditing } = useSaveEditing()
  const onValidSubmit = async (data: Record<string, TRecord>) => {
    await saveEditing(data)
    formSettings.reset(data)
    invalidateRecords()
  }

  return (
    <section className='flex shrink-1 gap-4 bg-[var(--content-field-color)] p-4 rounded-2xl max-[531px]:flex-col'>
      <ClearFilterButton />
      <ToggleEditButton />
      <ConfirmChangesButton
        disabled={!formSettings.formState.isValid}
        fieldChanged={formSettings.formState.isDirty}
        onConfirm={formSettings.handleSubmit(onValidSubmit, errors => console.log(errors))}
        onCancel={() => formSettings.reset(arrayToRecordWithID(tableData))}
      />
      <CancelChangesButton onCancel={() => formSettings.reset(arrayToRecordWithID(tableData))} />
      <ExportRecordsButton columnLabels={exportLabels} records={exportData} />
    </section>
  )
}

export default ControlPanel
