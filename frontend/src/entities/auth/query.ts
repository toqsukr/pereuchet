import { authService } from '@shared/api/auth'
import { useQuery } from '@tanstack/react-query'

const isAuthQueryKey = 'is-authorized'

export const useIsAuth = () => {
  return useQuery({
    queryKey: [isAuthQueryKey],
    queryFn: () => authService.check(),
    select: ({ isAuthorized }) => isAuthorized,
  })
}
