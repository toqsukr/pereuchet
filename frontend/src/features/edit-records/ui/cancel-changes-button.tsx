import { IconButton } from '@shared/uikit/icon-button'
import { RxCross2 } from 'react-icons/rx'
import { useEditRecords } from '../model/store'

export const CancelChangesButton = () => {
  const { isEditing, toggleIsEditing, clearEditedRecords } = useEditRecords()

  const handleClearEdited = () => {
    clearEditedRecords()
    toggleIsEditing()
  }

  if (!isEditing) return

  return (
    <IconButton
      title='Отменить изменения'
      onClick={handleClearEdited}
      Icon={<RxCross2 className='w-6 h-6 scale-120' />}
    />
  )
}
