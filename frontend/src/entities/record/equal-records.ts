import type { TRecord } from './type'

export function equalRecords(record1: TRecord, record2: TRecord) {
  return Object.keys(record1).every(key => {
    const recordKey = key as keyof TRecord
    return record1[recordKey] === record2[recordKey]
  })
}
