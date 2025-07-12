import { useVirtual } from './store'

export const useResetPage = () => {
  const { updatePage } = useVirtual()

  return () => updatePage(0)
}
