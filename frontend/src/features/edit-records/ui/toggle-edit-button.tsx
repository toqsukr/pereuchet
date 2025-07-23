import { IconButton } from '@shared/uikit/icon-button'
import { FiEdit } from 'react-icons/fi'
import { useEditRecords } from '../model/store'

export const ToggleEditButton = () => {
  const { isEditing, toggleIsEditing } = useEditRecords()

  if (isEditing) return

  return (
    <IconButton
      title='Редактировать таблицу'
      onClick={toggleIsEditing}
      Icon={<FiEdit className='w-6 h-6 ' />}
    />
  )
}
