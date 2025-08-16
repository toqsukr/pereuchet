import { IconButton, type IconButtonProps } from '@shared/uikit/icon-button'
import type { FC } from 'react'
import { FiEdit } from 'react-icons/fi'
import { useEditTable } from '../model/store'

export const ToggleEditButton: FC<Omit<IconButtonProps, 'Icon'>> = props => {
  const { isEditing, toggleIsEditing } = useEditTable()

  if (isEditing) return

  return (
    <IconButton
      {...props}
      title='Редактировать таблицу'
      onClick={toggleIsEditing}
      Icon={<FiEdit className='w-6 h-6 ' />}
    />
  )
}
