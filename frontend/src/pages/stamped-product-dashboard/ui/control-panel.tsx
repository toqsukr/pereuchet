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

const exportLabels = ['ID', 'Создан', 'Штамповщик', 'Подошва', 'Количество'] as const

type ControlPanelProps<TFieldValues extends FieldValues> = {
  formSettings: UseFormReturn<TFieldValues>
  tableData: TStampedProduct[] | undefined
  exportData: TStampedProduct[] | undefined
}

const ControlPanel = (props: ControlPanelProps<Record<string, TStampedProduct>>) => {
  const { formSettings, exportData, tableData } = props
  const invalidateStampedProducts = useInvalidateStampedProducts()
  const { mutateAsync: acceptProducts, isPending: isProductsAccepting } = useAcceptStampedProducts()
  const onValidSubmit = async (data: Record<string, TStampedProduct>) => {
    await acceptProducts(data)
    formSettings.reset(data)
    invalidateStampedProducts()
  }

  return (
    <section className='flex shrink-1 gap-4 bg-[var(--content-field-color)] p-4 rounded-2xl max-[1152px]:flex-col'>
      <ClearFilterButton />
      <ToggleEditButton disabled={isProductsAccepting} />
      <ConfirmChangesButton
        disabled={!formSettings.formState.isValid || isProductsAccepting}
        fieldChanged={formSettings.formState.isDirty}
        onConfirm={formSettings.handleSubmit(onValidSubmit, errors => alert(errors))}
        onCancel={() => formSettings.reset(arrayToRecordWithID(tableData))}
      />
      <CancelChangesButton onCancel={() => formSettings.reset(arrayToRecordWithID(tableData))} />
      <ExportRecordsButton
        disabled={isProductsAccepting}
        columnLabels={exportLabels}
        data={exportData}
      />
    </section>
  )
}

export default ControlPanel
