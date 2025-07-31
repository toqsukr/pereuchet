import { IconButton } from '@shared/uikit/icon-button'
import { type FC } from 'react'
import { CSVLink } from 'react-csv'
import type { Data } from 'react-csv/lib/core'
import { FaFileCsv } from 'react-icons/fa'

type ExportButtonProps = {
  fileprefix: string
  data: string | Data | (() => string | Data)
}

export const ExportButton: FC<ExportButtonProps> = props => {
  const { fileprefix } = props
  return (
    <CSVLink
      {...props}
      separator=';'
      target='_blank'
      title='Экспорт в CSV'
      filename={`Экспорт_данных_${fileprefix}.csv`}>
      <IconButton Icon={<FaFileCsv className='w-6 h-6' />} />
    </CSVLink>
  )
}
