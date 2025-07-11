import axios from 'axios'

const baseTemplate = axios.create({
  baseURL: `${import.meta.env.VITE_HOST_URL}/api`,
  headers: {
    'Content-Type': 'application/json',
  },
})

export default baseTemplate
