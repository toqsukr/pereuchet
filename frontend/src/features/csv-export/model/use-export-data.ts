export const useExportData = ({
  data,
  labels,
}: {
  data: object[] | undefined
  labels: string[]
}) => {
  return [labels, ...(data ?? []).map(obj => [...Object.values(obj)])]
}
