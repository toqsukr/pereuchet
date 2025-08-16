import { IconButton } from '@shared/uikit/icon-button'
import { FiEdit } from 'react-icons/fi'
import { useEditTable } from '../model/store'

export const ToggleEditButton = () => {
  const { isEditing, toggleIsEditing } = useEditTable()

  if (isEditing) return

  return (
    <IconButton
      title='Редактировать таблицу'
      onClick={toggleIsEditing}
      Icon={<FiEdit className='w-6 h-6 ' />}
    />
  )
}
