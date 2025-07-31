import { useDateFilter } from './store'

export const useActiveFilter = () => {
  const { filter } = useDateFilter()

  if (filter === null) return false

  if (filter instanceof Array && filter[0] === null && filter[1] === null) return false

  return filter
}
