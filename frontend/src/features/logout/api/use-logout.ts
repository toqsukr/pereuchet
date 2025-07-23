import { authService } from '@shared/api/auth'
import { useMutation } from '@tanstack/react-query'

const LOGOUT_MUTATION_KEY = 'auth-logout'

export const useLogout = () => {
  return useMutation({
    mutationKey: [LOGOUT_MUTATION_KEY],
    mutationFn: () => authService.logout(),
  })
}
