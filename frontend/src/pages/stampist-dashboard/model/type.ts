import type { TStampist } from '@entities/stampist'

export type TStampistShownData = Omit<TStampist, 'isDeleted'>
