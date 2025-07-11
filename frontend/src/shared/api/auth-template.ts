import axios from 'axios'
import baseTemplate from './base-template'

const authTemplate = axios.create({
  ...baseTemplate.defaults,
  baseURL: baseTemplate.defaults.baseURL,
  headers: { ...baseTemplate.defaults.headers },
})

authTemplate.interceptors.response.use(
  response => response,
  error => {
    if (error.response?.status === 401) {
      // remove from cookie
    }
    return Promise.reject(error)
  }
)

export default authTemplate
