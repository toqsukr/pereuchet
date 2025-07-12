export const useTableData = (data: object[] | undefined) => {
  return (data ?? []).map(row =>
    Object.values(row).map(value => ({
      value,
      readOnly: true,
    }))
  )
}
