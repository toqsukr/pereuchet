import { useGetConfirmation } from '@shared/lib/confirmation'
import { IconButton } from '@shared/uikit/icon-button'
import { type FC } from 'react'
import { FaCheck } from 'react-icons/fa6'
import { useEditRecords } from '../model/store'

export const ConfirmChangesButton: FC<{ onConfirm?: () => void }> = ({ onConfirm }) => {
  const getConfirmation = useGetConfirmation()
  const { isEditing, toggleIsEditing } = useEditRecords()

  const handleConfirm = async () => {
    const res = await getConfirmation({
      confirmText: 'Сохранить',
      closeText: 'Сбросить',
      description: 'Сохранить внесенные изменения?',
    })

    toggleIsEditing()

    if (!res) return

    onConfirm?.()
    console.log('editing successful saved!')
  }

  if (!isEditing) return

  return (
    <IconButton
      title='Сохранить изменения'
      onClick={handleConfirm}
      Icon={<FaCheck className='w-6 h-6 ' />}
    />
  )
}
