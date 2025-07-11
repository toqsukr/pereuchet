import { recordService } from '@shared/api/record'
import { useQuery } from '@tanstack/react-query'

const RECORD_QUERY_KEY = 'get-all-records'

export const useRecords = () => {
  return useQuery({
    queryKey: [RECORD_QUERY_KEY],
    queryFn: () =>
      recordService
        .getRecords()
        .then(arr =>
          arr.map(({ id, date, ...fields }) => ({
            id,
            date: date.toISOString().slice(0, -5),
            ...fields,
          }))
        ),
    refetchInterval: 30 * 1000, // 30sec
  })
}
