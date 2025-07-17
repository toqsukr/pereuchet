import baseTemplate from './base-template'

const AUTH_PREFIX = '/auth'

export const authService = {
  register(login: string, password: string) {
    return baseTemplate.post(`${AUTH_PREFIX}/register`, { login, password })
  },

  login(login: string, password: string) {
    return baseTemplate.post(`${AUTH_PREFIX}/login`, { login, password })
  },
} as const
