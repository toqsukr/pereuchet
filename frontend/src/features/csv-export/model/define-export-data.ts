export function defineExportData(data: object[] | undefined, labels: readonly string[]) {
  return [labels, ...(data ?? []).map(obj => [...Object.values(obj)] satisfies unknown[])]
}
