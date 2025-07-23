import { useProductByCode } from '@entities/product'
import { useRecords } from '@entities/record'
import { ControlTable } from '@features/control-table'
import { ExportButton, useExportData } from '@features/csv-export'
import { ClearFilterButton, DateFilter, useFilteredData } from '@features/date-filter'
import {
  CancelChangesButton,
  ConfirmChangesButton,
  ToggleEditButton,
  useEditRecords,
} from '@features/edit-records'
import { useLocalRecords } from './model/use-local-records'
import './styles.scss'
import { RecordRow } from './ui/record-row'

const columnLabels = ['ID', 'Дата', 'Штамповщик', 'Тип', 'Количество']

// dayjs(date).format('DD.MM.YYYY HH:mm:ss')

const ControlBoardPage = () => {
  const { isEditing } = useEditRecords()
  const { data: records } = useRecords()
  const getProductByCode = useProductByCode()
  const { localRecords, updateRecord } = useLocalRecords() // ?
  const filteredData = useFilteredData(isEditing ? localRecords : records)

  const tableData = filteredData?.map(({ productCode, amount, date, id, workerID }) => ({
    id,
    date,
    workerID,
    productCode,
    amount,
  }))

  const exportData = useExportData({
    labels: columnLabels,
    data: filteredData?.map(({ productCode, amount, ...record }) => ({
      ...record,
      productName: getProductByCode(productCode)?.name,
      amount,
    })),
  })

  return (
    <div className='flex flex-col gap-4 w-full max-w-[1444px] min-w-[820px] fixed top-1/2 left-1/2 -translate-1/2 px-6'>
      <div className='flex gap-4'>
        <DateFilter />
        <section className='w-max flex gap-4 ml-auto bg-[var(--content-field-color)] p-4 rounded-2xl'>
          <ClearFilterButton />
          <ToggleEditButton />
          <ConfirmChangesButton onConfirm={() => console.log(localRecords)} />
          <CancelChangesButton />
          {isEditing || <ExportButton data={exportData} />}
        </section>
      </div>
      <div className='flex gap-4 rounded-2xl'>
        <ControlTable
          data={tableData}
          columnLabels={columnLabels}
          getCells={(_, value) => (
            <RecordRow key={value.id} record={value} saveRecord={updateRecord} />
          )}
        />
      </div>
    </div>
  )
}

export default ControlBoardPage
