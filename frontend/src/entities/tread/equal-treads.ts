import type { TTread } from './type'

export function equalTreads(tread1: TTread, tread2: TTread) {
  return Object.keys(tread1).every(key => {
    const treadKey = key as keyof TTread
    return tread1[treadKey] === tread2[treadKey]
  })
}
