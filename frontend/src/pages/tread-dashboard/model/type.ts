import type { TTread } from '@entities/tread'

export type TTreadShownData = Omit<TTread, 'isDeleted'>
