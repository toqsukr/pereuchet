import { useTreads } from './query'

export const useTreadByCode = () => {
  const { data: treads } = useTreads()

  return (treadCode: string) => treads?.find(({ code }) => code === treadCode)
}
