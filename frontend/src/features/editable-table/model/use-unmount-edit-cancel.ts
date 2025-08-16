import { useEffect } from 'react'
import { useEditTable } from './store'

export const useUnmountEditCancel = () => {
  const { updateIsEditing } = useEditTable()
  useEffect(() => {
    return () => {
      updateIsEditing(false)
    }
  }, [])
}
