import { useProductByCode, useProducts } from '@entities/product'
import { useRecords } from '@entities/record'
import {
  ControlTable,
  MAX_ROWS,
  NumberedPanel,
  useResetPage,
  useTableData,
} from '@features/control-table'
import { ExportButton, useExportData } from '@features/csv-export'
import { ClearFilterButton, DateFilter, useFilteredData } from '@features/date-filter'
import { Routes } from '@shared/model/routes'
import Spinner from '@shared/uikit/spinner'
import { Navigate } from 'react-router-dom'
import './styles.scss'

const columnLabels = ['ID', 'Дата', 'Штамповщик', 'Тип', 'Количество']

const ControlBoardPage = () => {
  const { data: records, isLoading: isRecordsLoading } = useRecords()
  const { isLoading: isProductsLoading } = useProducts()
  const filteredData = useFilteredData(records)
  const resetPage = useResetPage()
  const getProductByCode = useProductByCode()

  const tableData = useTableData(
    filteredData?.map(({ productCode, amount, ...record }) => ({
      ...record,
      productName: getProductByCode(productCode)?.name,
      amount,
    }))
  )

  const exportData = useExportData({
    labels: columnLabels,
    data: filteredData?.map(({ productCode, amount, ...record }) => ({
      ...record,
      productName: getProductByCode(productCode)?.name,
      amount,
    })),
  })

  if (false) return <Navigate to={Routes.AUTH} />

  if (isRecordsLoading || isProductsLoading)
    return <Spinner className='fixed top-1/2 left-1/2 -translate-1/2' />

  return (
    <div className='flex flex-col gap-4 w-full max-w-[1444px] min-w-[820px] fixed top-1/2 left-1/2 -translate-1/2 px-6'>
      <div className='flex gap-4'>
        <DateFilter onPick={resetPage} />
        <section className='w-max flex gap-4 ml-auto bg-[var(--content-field-color)] p-4 rounded-2xl'>
          <ClearFilterButton />
          <ExportButton data={exportData} />
        </section>
      </div>
      <div style={{ maxHeight: `${(MAX_ROWS + 1) * 30.5}px` }} className='flex gap-4 rounded-2xl'>
        <ControlTable data={tableData} columnLabels={columnLabels} />
        <NumberedPanel data={tableData} />
      </div>
    </div>
  )
}

export default ControlBoardPage
