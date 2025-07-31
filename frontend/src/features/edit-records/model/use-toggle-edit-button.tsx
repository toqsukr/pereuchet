import type { DetailedHTMLProps, HTMLAttributes } from 'react'
import { FiEdit } from 'react-icons/fi'
import { useEditRecords } from './store'

export const useToggleEditButton = () => {
  const { toggleIsEditing } = useEditRecords()

  const action = toggleIsEditing

  const buttonProps: DetailedHTMLProps<HTMLAttributes<HTMLButtonElement>, HTMLButtonElement> = {
    title: 'Редактировать таблицу',
  }

  return {
    action,
    buttonProps,
    element: <FiEdit className='w-6 h-6 ' />,
  }
}
