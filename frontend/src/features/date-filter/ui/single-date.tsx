import Calendar from '@shared/uikit/calendar'
import type { FC } from 'react'
import { useDateFilter } from '../model/store'

const SingleDate: FC<{ onPick?: () => void }> = ({ onPick }) => {
  const { isPeriod, filter, updateFilter } = useDateFilter()
  if (isPeriod || (filter && Array.isArray(filter))) return

  const handlePick = (date: Date | null) => {
    updateFilter(date)
    onPick?.()
  }

  return (
    <div className='flex items-center gap-2'>
      <label className='px-2'>Дата: </label>
      <Calendar filter={filter} updateFilter={handlePick} />
    </div>
  )
}

export default SingleDate
