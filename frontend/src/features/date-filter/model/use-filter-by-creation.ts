import dayjs from 'dayjs'
import { useMemo } from 'react'
import { useDateFilter } from './store'

const filterData = <TData extends { createdAt: string }[]>(
  data: TData | undefined,
  filter: Date | [from: Date | null, to: Date | null] | null
) => {
  if (!filter || (Array.isArray(filter) && (!filter[0] || !filter[1]))) return data

  if (!Array.isArray(filter))
    return data?.filter(({ createdAt }) => dayjs(createdAt).isSame(filter, 'day')) as TData

  return data?.filter(
    ({ createdAt }) =>
      (dayjs(createdAt).isAfter(filter[0]) || dayjs(createdAt).isSame(filter[0], 'day')) &&
      (dayjs(createdAt).isBefore(filter[1]) || dayjs(createdAt).isSame(filter[1], 'day'))
  ) as TData
}

export const useFilterByCreation = <TData extends { createdAt: string }[]>(
  data: TData | undefined
): TData | undefined => {
  const { filter } = useDateFilter()
  const filteredData = useMemo(() => filterData(data, filter), [data, filter])
  return filteredData
}
