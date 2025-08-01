import { useProducts } from '@entities/product'
import { useRecords } from '@entities/record'
import { useWorkers } from '@entities/worker'
import { useIsRecordsSaving } from '@pages/control-board'
import Spinner from '@shared/uikit/spinner'
import { type FC, type PropsWithChildren } from 'react'

const AuthLoadingLayout: FC<PropsWithChildren> = ({ children }) => {
  const { isLoading: isProductsLoading } = useProducts()
  const { isLoading: isWorkersLoading } = useWorkers()
  const { isLoading: isRecordsLoading } = useRecords()
  const isRecordsSaving = useIsRecordsSaving()

  if (isProductsLoading || isWorkersLoading || isRecordsLoading || isRecordsSaving)
    return <Spinner className='fixed top-1/2 left-1/2 -translate-1/2' />

  return children
}

export default AuthLoadingLayout
