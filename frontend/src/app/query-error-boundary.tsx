import { Routes } from '@shared/model/routes'
import type { ReactNode } from 'react'
import { useNavigate } from 'react-router-dom'
import { ErrorBoundary } from './error-boundary'

export const QueryErrorBoundary = ({ children }: { children: ReactNode }) => {
  const navigate = useNavigate()
  return <ErrorBoundary onUnauthorized={() => navigate(Routes.AUTH)}>{children}</ErrorBoundary>
}
