import axios from 'axios'
import baseTemplate from './base-template'

export class UnauthorizedError extends Error {}

const authTemplate = axios.create({
  ...baseTemplate.defaults,
  withCredentials: true,
  baseURL: baseTemplate.defaults.baseURL,
  headers: { ...baseTemplate.defaults.headers },
})

authTemplate.interceptors.response.use(
  response => response,
  error => {
    if (error.response?.status === 401) {
      throw new UnauthorizedError()
    }
    return Promise.reject(error)
  }
)

export default authTemplate
