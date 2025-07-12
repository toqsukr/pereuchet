import type { TRecord } from '@entities/record'
import dayjs from 'dayjs'
import { useDateFilter } from './store'

export const useFilteredData = (data: TRecord[] | undefined) => {
  const { filter } = useDateFilter()

  if (!filter || (Array.isArray(filter) && (!filter[0] || !filter[1]))) return data

  if (!Array.isArray(filter)) return data?.filter(({ date }) => dayjs(date).isSame(filter, 'day'))

  return data?.filter(
    ({ date }) =>
      (dayjs(date).isAfter(filter[0]) || dayjs(date).isSame(filter[0], 'day')) &&
      (dayjs(date).isBefore(filter[1]) || dayjs(date).isSame(filter[1], 'day'))
  )
}
