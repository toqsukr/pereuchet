import type { TStampist } from './type'

export function equalStampists(stampist1: TStampist, stampist2: TStampist) {
  return Object.keys(stampist1).every(key => {
    const stampistKey = key as keyof TStampist
    return stampist1[stampistKey] === stampist2[stampistKey]
  })
}
