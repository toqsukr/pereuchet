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
    <section className='flex shrink-1 w-full gap-4 justify-between bg-[var(--content-field-color)] p-4 rounded-2xl max-[1057px]:flex-col max-[1057px]:justify-start'>
      <div className='flex items-center gap-4 py-2' onClick={handleCheck}>
        <Checkbox checked={isPeriod} />
        <label>За период</label>
      </div>
      <PeriodDate onPick={onPick} />
      <SingleDate onPick={onPick} />
    </section>
  )
}
