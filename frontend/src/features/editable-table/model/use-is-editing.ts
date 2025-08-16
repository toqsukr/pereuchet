import { useEditTable } from './store'

export const useIsEditing = () => {
  const isEditing = useEditTable(s => s.isEditing)

  return isEditing
}
