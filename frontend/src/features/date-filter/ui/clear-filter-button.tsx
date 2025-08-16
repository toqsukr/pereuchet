import { IconButton, type IconButtonProps } from '@shared/uikit/icon-button'
import type { FC } from 'react'
import { TbFilterX } from 'react-icons/tb'
import { useDateFilter } from '../model/store'

export const ClearFilterButton: FC<Omit<IconButtonProps, 'Icon'>> = props => {
  const { filter, updateFilter } = useDateFilter()
  return (
    <IconButton
      {...props}
      disabled={!filter || props.disabled}
      title='Сбросить фильтр'
      Icon={<TbFilterX className='w-6 h-6' />}
      onClick={() => updateFilter(null)}
    />
  )
}
