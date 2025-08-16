import { useStampedProducts } from '@entities/stamped-product'
import { DateFilter, useFilterByCreation } from '@features/date-filter'
import { EditableTable } from '@features/editable-table'
import { zodResolver } from '@hookform/resolvers/zod'
import { arrayToRecordWithID } from '@shared/lib/transform'
import { useCallback, useMemo } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import type { TProductShownData } from './model/type'
import { useTableData } from './model/use-table-data'
import ControlPanel from './ui/control-panel'
import { ProductRow } from './ui/product-row'

const tableLabels = ['ID', 'Создан', 'Создатель', 'Штамповщик', 'Подошва', 'Количество'] as const

const columnSizes = {
  0: { min: '8rem' },
  1: { min: '12rem' },
  2: { min: '7rem' },
  3: { min: '8rem' },
  4: { min: '12rem' },
  5: { min: '7.5rem' },
} as const

const ProductFormSchema = z.record(
  z.object({
    id: z.coerce.number(),
    createdAt: z.string(),
    createdBy: z.string(),
    editedAt: z.string(),
    editedBy: z.string(),
    stampistID: z.coerce.number().min(1),
    treadCode: z.string().min(1),
    isDeleted: z.boolean(),
    amount: z.coerce.number().positive().int().max(5000),
  })
)

const StampedProductDashboard = () => {
  const { data: products } = useStampedProducts()
  const filteredData = useFilterByCreation(products)

  const formSettings = useForm({
    mode: 'onChange',
    resolver: zodResolver(ProductFormSchema),
    defaultValues: arrayToRecordWithID(filteredData),
  })

  const tableData = useTableData(filteredData)

  const memoizedControl = useMemo(() => formSettings.control, [formSettings.control])
  const memoizedSetFormState = useCallback(formSettings.setValue, [formSettings.setValue])

  const memoizedGetCells = useCallback(
    (_row: number, value: TProductShownData) => (
      <ProductRow
        key={value.id}
        product={value}
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

export default StampedProductDashboard

export { useIsStampedProductsSaving } from './api/use-accept-stamped-products'
