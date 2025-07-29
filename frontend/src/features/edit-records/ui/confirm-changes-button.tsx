import { useGetConfirmation } from '@shared/lib/confirmation'
import { IconButton } from '@shared/uikit/icon-button'
import { type DetailedHTMLProps, type FC } from 'react'
import { FaCheck } from 'react-icons/fa6'
import { useEditRecords } from '../model/store'

type ConfirmChangesButtonProps = DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
> & { fieldChanged: boolean; onConfirm?: () => void; onCancel?: () => void }

export const ConfirmChangesButton: FC<ConfirmChangesButtonProps> = ({
  fieldChanged,
  onConfirm,
  onCancel,
  ...props
}) => {
  const getConfirmation = useGetConfirmation()
  const { isEditing, toggleIsEditing } = useEditRecords()

  const handleConfirm = async () => {
    if (fieldChanged) {
      const res = await getConfirmation({
        confirmText: 'Сохранить',
        closeText: 'Сбросить',
        description: 'Сохранить внесенные изменения?',
      })

      if (res) {
        onConfirm?.()
        console.log('editing successful saved!')
      } else {
        onCancel?.()
        console.log('editing canceled!')
      }
    }
    toggleIsEditing()
  }

  if (!isEditing) return

  return (
    <IconButton
      {...props}
      title='Сохранить изменения'
      onClick={handleConfirm}
      Icon={<FaCheck className='w-6 h-6 ' />}
    />
  )
}
