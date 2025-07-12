import { IconButton } from '@shared/uikit/icon-button'
import { TbFilterX } from 'react-icons/tb'
import { useDateFilter } from '../model/store'

export const ClearFilterButton = () => {
  const { updateFilter } = useDateFilter()
  return (
    <IconButton
      title='Сбросить фильтр'
      Icon={<TbFilterX className='w-6 h-6' />}
      onClick={() => updateFilter(null)}
    />
  )
}
