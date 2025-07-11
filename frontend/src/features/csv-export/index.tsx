import { IconButton } from '@shared/uikit/icon-button'
import { type FC } from 'react'
import { CSVLink } from 'react-csv'
import type { Data } from 'react-csv/lib/core'
import { FaFileCsv } from 'react-icons/fa'

const ExportButton: FC<{
  fileprefix?: string
  data: string | Data | (() => string | Data)
}> = props => {
  return (
    <CSVLink
      {...props}
      separator=';'
      target='_blank'
      title='Экспорт в CSV'
      filename={`pereuchet-${new Date().toISOString()}.csv`}>
      <IconButton Icon={<FaFileCsv className='w-6 h-6' />} />
    </CSVLink>
  )
}

export default ExportButton
