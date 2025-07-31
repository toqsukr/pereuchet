import { authService } from '@shared/api/auth'
import { handleAxiosError } from '@shared/lib/error'
import { useMutation } from '@tanstack/react-query'

const LOGIN_MUTATION_KEY = 'auth-login'

export const useLogin = () => {
  return useMutation({
    mutationKey: [LOGIN_MUTATION_KEY],
    mutationFn: (data: { login: string; password: string }) =>
      authService.login(data.login, data.password),
    onError: error => {
      alert(handleAxiosError(error))
    },
  })
}
