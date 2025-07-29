export const arrayToRecordWithID = <TData extends { id: string | number }>(
  data: TData[] | undefined
) => {
  return data?.reduce((records, row) => {
    return { ...records, [row.id]: row }
  }, {} as Record<string, TData>)
}
