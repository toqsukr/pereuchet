import { useIsAuth } from '@entities/auth'
import Spinner from '@shared/uikit/spinner'
import { type FC, type PropsWithChildren } from 'react'

const LoadingLayout: FC<PropsWithChildren> = ({ children }) => {
  const { isLoading: isAuthChecking } = useIsAuth()

  if (isAuthChecking) return <Spinner className='fixed top-1/2 left-1/2 -translate-1/2' />

  return <div className='w-full'>{children}</div>
}

export default LoadingLayout
