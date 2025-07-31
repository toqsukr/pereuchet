import { useProductByCode } from '@entities/product'
import type { TRecord } from '@entities/record'
import { defineExportData, ExportButton } from '@features/csv-export'
import { useActiveFilter } from '@features/date-filter'
import { useEditRecords } from '@features/edit-records'
import dayjs from 'dayjs'
import { type FC } from 'react'

type ExportRecordsButtonProps = {
  records: TRecord[] | undefined
  columnLabels: readonly string[]
}

function formatDate(date: Date) {
  return dayjs(date).format('DD.MM.YYYY')
}

function defineFileFilterPrefix(exportFilter: false | Date | [from: Date | null, to: Date | null]) {
  if (
    !exportFilter ||
    exportFilter === null ||
    (exportFilter instanceof Array && (exportFilter[0] === null || exportFilter[1] === null))
  )
    return 'полный'

  if (exportFilter instanceof Date) return `фильтр_${formatDate(exportFilter)}`

  const periodFilter = exportFilter as [Date, Date]

  return `фильтр_от-${formatDate(periodFilter[0])}-до-${formatDate(periodFilter[1])}`
}

const ExportRecordsButton: FC<ExportRecordsButtonProps> = props => {
  const { isEditing } = useEditRecords()
  const getProductByCode = useProductByCode()
  const exportFilter = useActiveFilter()

  const preparedData = props.records?.map(({ productCode, amount, ...record }) => ({
    ...record,
    productName: getProductByCode(productCode)?.name,
    amount,
  }))

  const exportData = defineExportData(preparedData, props.columnLabels)

  if (isEditing) return

  return <ExportButton data={exportData} fileprefix={`${defineFileFilterPrefix(exportFilter)}`} />
}

export default ExportRecordsButton
