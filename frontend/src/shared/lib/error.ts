import { AxiosError } from 'axios'

export const handleAxiosError = (error: unknown) => {
  if (!(error instanceof AxiosError)) return error

  const res = error.response?.data as unknown

  if (!(typeof res === 'object' && res && 'message' in res)) return res

  return res.message
}
