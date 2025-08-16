import type { TStampedProduct } from '@entities/stamped-product'
import { useTreadByCode } from '@entities/tread'
import { defineExportData, ExportButton } from '@features/csv-export'
import { useActiveFilter } from '@features/date-filter'
import { useIsEditing } from '@features/editable-table'
import type { IconButtonProps } from '@shared/uikit/icon-button'
import dayjs from 'dayjs'
import { type FC } from 'react'

type ExportProductsButtonProps = {
  data: TStampedProduct[] | undefined
  columnLabels: readonly string[]
} & Omit<IconButtonProps, 'Icon'>

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

const ExportProductsButton: FC<ExportProductsButtonProps> = ({ data, columnLabels, ...props }) => {
  const isEditing = useIsEditing()
  const getTreadByCode = useTreadByCode()
  const exportFilter = useActiveFilter()

  const preparedData = data?.map(({ id, createdAt, stampistID, treadCode, amount }) => ({
    id,
    createdAt,
    stampistID,
    treadName: getTreadByCode(treadCode)?.name,
    amount,
  }))

  const exportData = defineExportData(preparedData, columnLabels)

  if (isEditing) return

  return (
    <ExportButton
      {...props}
      data={exportData}
      fileprefix={`${defineFileFilterPrefix(exportFilter)}`}
    />
  )
}

export default ExportProductsButton
