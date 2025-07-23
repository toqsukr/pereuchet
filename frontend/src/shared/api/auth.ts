import { z } from 'zod'
import authTemplate from './auth-template'
import baseTemplate from './base-template'

const AUTH_PREFIX = '/auth'

const CheckAuthSchema = z.object({
  isAuthorized: z.boolean(),
})

export const authService = {
  async register(login: string, password: string) {
    return baseTemplate.post(`${AUTH_PREFIX}/register`, { login, password })
  },

  async login(login: string, password: string) {
    return baseTemplate.post(`${AUTH_PREFIX}/login`, { login, password })
  },

  async logout() {
    return baseTemplate.post(`${AUTH_PREFIX}/logout`)
  },

  async check() {
    return authTemplate.get(`${AUTH_PREFIX}/check`).then(({ data }) => CheckAuthSchema.parse(data))
  },
} as const
