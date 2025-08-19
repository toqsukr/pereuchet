import { useInvalidateTreads, type TTread } from '@entities/tread'
import {
  CancelChangesButton,
  ConfirmChangesButton,
  ToggleEditButton,
} from '@features/editable-table'
import { arrayToRecordWithID } from '@shared/lib/transform'
import type { FieldValues, UseFormReturn } from 'react-hook-form'
import { useUpdateTreads } from '../api/use-update-treads'

type ControlPanelProps<TFieldValues extends FieldValues> = {
  formSettings: UseFormReturn<TFieldValues>
  tableData: TTread[] | undefined
}

const ControlPanel = (props: ControlPanelProps<Record<string, TTread>>) => {
  const { formSettings, tableData } = props
  const invalidateTreads = useInvalidateTreads()
  const { mutateAsync: updateTreads, isPending: isTreadsUpdating } = useUpdateTreads()
  const onValidSubmit = async (data: Record<string, TTread>) => {
    await updateTreads(data)
    formSettings.reset(data)
    invalidateTreads()
  }

  const tableDataWithID = tableData?.map(record => ({ ...record, id: record.code }))

  return (
    <section className='flex justify-end bg-[var(--content-field-color)] p-4 rounded-2xl'>
      <div className='w-max flex gap-4'>
        <ToggleEditButton disabled={isTreadsUpdating} />
        <ConfirmChangesButton
          disabled={!formSettings.formState.isValid || isTreadsUpdating}
          fieldChanged={formSettings.formState.isDirty}
          onConfirm={formSettings.handleSubmit(onValidSubmit, errors => alert(errors))}
          onCancel={() => formSettings.reset(arrayToRecordWithID(tableDataWithID))}
        />
        <CancelChangesButton
          onCancel={() => formSettings.reset(arrayToRecordWithID(tableDataWithID))}
        />
      </div>
    </section>
  )
}

export default ControlPanel
