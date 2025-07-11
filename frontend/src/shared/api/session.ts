import authTemplate from './auth-template'

export const SessionService = {
  issueToken(password: string) {
    return authTemplate.post('/session', { password })
  },
} as const
