import { UnauthorizedError } from '@shared/api/auth-template'
import { Component, type ReactNode } from 'react'

interface ErrorBoundaryProps {
  children: ReactNode
  onUnauthorized: () => void
}

export class ErrorBoundary extends Component<ErrorBoundaryProps> {
  componentDidCatch(error: unknown) {
    if (error instanceof UnauthorizedError) {
      this.props.onUnauthorized()
    }
  }

  render() {
    return this.props.children
  }
}
