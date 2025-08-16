import { useInvalidateStampedProducts, type TStampedProduct } from '@entities/stamped-product'
import { ClearFilterButton } from '@features/date-filter'
import {
  CancelChangesButton,
  ConfirmChangesButton,
  ToggleEditButton,
} from '@features/editable-table'
import { arrayToRecordWithID } from '@shared/lib/transform'
import type { FieldValues, UseFormReturn } from 'react-hook-form'
import { useAcceptStampedProducts } from '../api/use-accept-stamped-products'
import ExportRecordsButton from './export-products-button'

const exportLabels = ['ID', 'Создан', 'Штамповщик', 'Тип', 'Количество'] as const

type ControlPanelProps<TFieldValues extends FieldValues> = {
  formSettings: UseFormReturn<TFieldValues>
  tableData: TStampedProduct[] | undefined
  exportData: TStampedProduct[] | undefined
}

const ControlPanel = (props: ControlPanelProps<Record<string, TStampedProduct>>) => {
  const { formSettings, exportData, tableData } = props
  const invalidateStampedProducts = useInvalidateStampedProducts()
  const { mutateAsync: saveEditing } = useAcceptStampedProducts()
  const onValidSubmit = async (data: Record<string, TStampedProduct>) => {
    await saveEditing(data)
    formSettings.reset(data)
    invalidateStampedProducts()
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
      <ExportRecordsButton columnLabels={exportLabels} data={exportData} />
    </section>
  )
}

export default ControlPanel
