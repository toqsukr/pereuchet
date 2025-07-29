export const useExportData = ({
  data,
  labels,
}: {
  data: object[] | undefined
  labels: readonly string[]
}) => {
  return [labels, ...(data ?? []).map(obj => [...Object.values(obj)])]
}
