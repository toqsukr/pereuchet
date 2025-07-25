import { QueryClient } from '@tanstack/react-query'
import { UnauthorizedError } from './auth-template'

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 30 * 1000,
      retry: (_, error) => {
        return !(error instanceof UnauthorizedError)
      },
      throwOnError: error => {
        return error instanceof UnauthorizedError
      },
    },
    mutations: {
      retry: () => false,
      throwOnError: error => {
        return error instanceof UnauthorizedError
      },
    },
  },
})
