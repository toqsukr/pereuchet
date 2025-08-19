import { useInvalidateStampists, type TStampist } from '@entities/stampist'
import {
  CancelChangesButton,
  ConfirmChangesButton,
  ToggleEditButton,
} from '@features/editable-table'
import { arrayToRecordWithID } from '@shared/lib/transform'
import type { FieldValues, UseFormReturn } from 'react-hook-form'
import { useUpdateStampists } from '../api/use-update-stampists'

type ControlPanelProps<TFieldValues extends FieldValues> = {
  formSettings: UseFormReturn<TFieldValues>
  tableData: TStampist[] | undefined
}

const ControlPanel = (props: ControlPanelProps<Record<string, TStampist>>) => {
  const { formSettings, tableData } = props
  const invalidateStampists = useInvalidateStampists()
  const { mutateAsync: updateStampists, isPending: isStampistsUpdating } = useUpdateStampists()
  const onValidSubmit = async (data: Record<string, TStampist>) => {
    await updateStampists(data)
    formSettings.reset(data)
    invalidateStampists()
  }

  return (
    <section className='flex shrink justify-end bg-[var(--content-field-color)] p-4 rounded-2xl'>
      <div className='w-max flex gap-4'>
        <ToggleEditButton disabled={isStampistsUpdating} />
        <ConfirmChangesButton
          disabled={!formSettings.formState.isValid || isStampistsUpdating}
          fieldChanged={formSettings.formState.isDirty}
          onConfirm={formSettings.handleSubmit(onValidSubmit, errors => alert(errors))}
          onCancel={() => formSettings.reset(arrayToRecordWithID(tableData))}
        />
        <CancelChangesButton onCancel={() => formSettings.reset(arrayToRecordWithID(tableData))} />
      </div>
    </section>
  )
}

export default ControlPanel
