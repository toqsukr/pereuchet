import Checkbox from '@shared/uikit/checkbox'
import type { FC } from 'react'
import { useDateFilter } from '../model/store'
import PeriodDate from './period-date'
import SingleDate from './single-date'

export const DateFilter: FC<{ onPick?: () => void }> = ({ onPick }) => {
  const { isPeriod, toggleIsPeriod, updateFilter } = useDateFilter()

  const handleCheck = () => {
    updateFilter(null)
    toggleIsPeriod()
  }

  return (
    <section className='flex w-full justify-between bg-[var(--content-field-color)] p-4 rounded-2xl'>
      <div className='flex items-center' onClick={handleCheck}>
        <Checkbox checked={isPeriod} />
        <label>За период</label>
      </div>
      <PeriodDate onPick={onPick} />
      <SingleDate onPick={onPick} />
    </section>
  )
}
