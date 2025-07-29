import dayjs from 'dayjs'
import { useDateFilter } from './store'

export const useFilteredData = <TData extends { date: string }[]>(
  data: TData | undefined
): TData | undefined => {
  const { filter } = useDateFilter()

  if (!filter || (Array.isArray(filter) && (!filter[0] || !filter[1]))) return data

  if (!Array.isArray(filter))
    return data?.filter(({ date }) => dayjs(date).isSame(filter, 'day')) as TData

  return data?.filter(
    ({ date }) =>
      (dayjs(date).isAfter(filter[0]) || dayjs(date).isSame(filter[0], 'day')) &&
      (dayjs(date).isBefore(filter[1]) || dayjs(date).isSame(filter[1], 'day'))
  ) as TData
}
