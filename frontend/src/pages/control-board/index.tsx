import { useProducts } from '@entities/product'
import { useRecords } from '@entities/record'
import { ControlTable, MAX_ROWS, NumberedPanel, useVirtual } from '@features/control-table'
import ExportButton from '@features/csv-export'
import { DateFilter, useDateFilter } from '@features/date-filter'
import { IconButton } from '@shared/uikit/icon-button'
import Spinner from '@shared/uikit/spinner'
import { TbFilterX } from 'react-icons/tb'
import { useFilteredData } from './model/use-filtered-data'
import './styles.scss'

const columnLabels = ['ID', 'Дата', 'Штамповщик', 'Тип', 'Количество']

const ControlBoardPage = () => {
  const { data: records, isLoading: isRecordsLoading } = useRecords()
  const { data: products, isLoading: isProductsLoading } = useProducts()
  const filteredData = useFilteredData(records)
  const { updateFilter } = useDateFilter()
  const { updatePage } = useVirtual()

  const tableData = (filteredData ?? []).map(row =>
    Object.entries(row).map(value => ({
      value:
        value[0] === 'productCode'
          ? products?.find(({ code }) => code === value[1])?.name
          : value[1].toString(),
      readOnly: true,
    }))
  )

  const exportData = [
    columnLabels,
    ...(filteredData ?? []).map(({ id, date, productCode, workerID, amount }) => [
      id,
      date,
      products?.find(({ code }) => code === productCode)?.name,
      workerID,
      amount,
    ]),
  ]

  if (isRecordsLoading || isProductsLoading)
    return <Spinner className='fixed top-1/2 left-1/2 -translate-1/2' />

  return (
    <div className='flex flex-col gap-4 w-full max-w-[1444px] min-w-[820px] fixed top-1/2 left-1/2 -translate-1/2 px-6'>
      <div className='flex gap-4'>
        <DateFilter onPick={() => updatePage(0)} />
        <section className='w-max flex gap-4 ml-auto bg-[var(--content-field-color)] p-4 rounded-2xl'>
          <IconButton
            title='Сбросить фильтр'
            Icon={<TbFilterX className='w-6 h-6' />}
            onClick={() => updateFilter(null)}
          />
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
