import axios from 'axios'

export const HTTP_HOST_URL = 'http://10.84.10.84:3000'

const baseTemplate = axios.create({
  baseURL: `${HTTP_HOST_URL}/api`,
  headers: {
    'Content-Type': 'application/json',
  },
})

export default baseTemplate
