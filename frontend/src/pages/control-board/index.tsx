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
    <div className='flex flex-col gap-4 w-full h-full justify-self-center max-w-[1444px] px-6 overflow-auto'>
      <div className='w-full min-w-[1080px] flex gap-4'>
        <DateFilter />
        <section className='flex gap-4 ml-auto bg-[var(--content-field-color)] p-4 rounded-2xl'>
          <ClearFilterButton />
          <ToggleEditButton />
          <ConfirmChangesButton onConfirm={() => console.log(localRecords)} />
          <CancelChangesButton />
          {isEditing || <ExportButton data={exportData} />}
        </section>
      </div>
      <div className='flex h-full w-full min-w-[1080px] gap-4 pb-2 rounded-2xl'>
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
