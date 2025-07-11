import { Routes } from '@shared/model/routes'
import { type FC, type PropsWithChildren } from 'react'
import { Navigate } from 'react-router-dom'

const AuthLayout: FC<PropsWithChildren> = ({ children }) => {
  if (false) return <Navigate to={Routes.AUTH} replace />

  return children
}

export default AuthLayout
