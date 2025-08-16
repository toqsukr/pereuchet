import { useStampedProducts } from '@entities/stamped-product'
import { useStampists } from '@entities/stampist'
import { useTreads } from '@entities/tread'
import Spinner from '@shared/uikit/spinner'
import { type FC, type PropsWithChildren } from 'react'

const AuthLoadingLayout: FC<PropsWithChildren> = ({ children }) => {
  const { isLoading: isTreadsLoading } = useTreads()
  const { isLoading: isStampistsLoading } = useStampists()
  const { isLoading: isStampedProductsLoading } = useStampedProducts()

  if (isTreadsLoading || isStampistsLoading || isStampedProductsLoading)
    return <Spinner className='fixed top-1/2 left-1/2 -translate-1/2' />

  return children
}

export default AuthLoadingLayout
