import { IconButton } from '@shared/uikit/icon-button'
import type { DetailedHTMLProps, FC } from 'react'
import { RxCross2 } from 'react-icons/rx'
import { useEditRecords } from '../model/store'

type CancelChangesButtonProps = DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
> & { onCancel?: () => void }

export const CancelChangesButton: FC<CancelChangesButtonProps> = ({ onCancel, ...props }) => {
  const { isEditing, toggleIsEditing } = useEditRecords()

  const handleClearEdited = () => {
    toggleIsEditing()
    onCancel?.()
  }

  if (!isEditing) return

  return (
    <IconButton
      {...props}
      title='Отменить изменения'
      onClick={handleClearEdited}
      Icon={<RxCross2 className='w-6 h-6 scale-120' />}
    />
  )
}
