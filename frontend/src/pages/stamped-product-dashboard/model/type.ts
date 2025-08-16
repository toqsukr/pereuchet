import type { TStampedProduct } from '@entities/stamped-product'

export type TProductShownData = Omit<TStampedProduct, 'isDeleted' | 'editedAt' | 'editedBy'>
