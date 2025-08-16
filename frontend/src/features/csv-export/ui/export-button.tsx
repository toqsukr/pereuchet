import { IconButton, type IconButtonProps } from '@shared/uikit/icon-button'
import { type FC } from 'react'
import { CSVLink } from 'react-csv'
import type { Data } from 'react-csv/lib/core'
import { FaFileCsv } from 'react-icons/fa'

type ExportButtonProps = {
  fileprefix: string
  data: string | Data | (() => string | Data)
} & Omit<IconButtonProps, 'Icon'>

export const ExportButton: FC<ExportButtonProps> = ({ data, fileprefix, ...buttonProps }) => {
  return (
    <CSVLink
      data={data}
      separator=';'
      target='_blank'
      title='Экспорт в CSV'
      filename={`Экспорт_данных_${fileprefix}.csv`}>
      <IconButton
        {...buttonProps}
        Icon={<FaFileCsv className='w-6 h-6' />}
        onClick={e => {
          if (buttonProps.disabled) {
            e.stopPropagation()
          }
        }}
      />
    </CSVLink>
  )
}
