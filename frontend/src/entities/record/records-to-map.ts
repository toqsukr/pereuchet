import type { TRecord } from './type'

export const recordsToMap = (records: TRecord[] | undefined) => {
  return records?.reduce((acc, cur) => acc.set(cur.id, cur), new Map<TRecord['id'], TRecord>())
}
