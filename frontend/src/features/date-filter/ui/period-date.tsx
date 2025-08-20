import Calendar from '@shared/uikit/calendar'
import dayjs from 'dayjs'
import type { FC } from 'react'
import { useDateFilter } from '../model/store'

const PeriodDate: FC<{ onPick?: () => void }> = ({ onPick }) => {
  const { isPeriod, filter, updateFilter } = useDateFilter()

  if (!isPeriod || (filter && !Array.isArray(filter))) return

  const handlePick = (date: [Date | null, Date | null] | null) => {
    updateFilter(date)
    onPick?.()
  }

  return (
    <section className='flex gap-4 max-[1152px]:flex-col'>
      <div className='w-full flex items-center gap-4'>
        <label className='min-w-[1.5rem]'>От:</label>
        <Calendar
          filter={filter && filter[0]}
          updateFilter={value => handlePick([value, filter && filter[1]])}
          maxDate={filter && filter[1] ? dayjs(filter[1]) : undefined}
        />
      </div>
      <div className='w-full flex items-center gap-4'>
        <label className='min-w-[1.5rem]'>До:</label>
        <Calendar
          filter={filter && filter[1]}
          updateFilter={value => handlePick([filter && filter[0], value])}
          minDate={filter && filter[0] ? dayjs(filter[0]) : undefined}
        />
      </div>
    </section>
  )
}

export default PeriodDate
