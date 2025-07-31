import { useGetConfirmation } from '@shared/lib/confirmation'
import type { DetailedHTMLProps } from 'react'
import { FaCheck } from 'react-icons/fa'
import { useEditRecords } from './store'

type ConfirmChangesButtonProps = DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
> & { fieldChanged: boolean; onConfirm?: () => void; onCancel?: () => void }

export const useConfirmChangesButton = ({
  fieldChanged,
  onConfirm,
  onCancel,
  ...rest
}: ConfirmChangesButtonProps) => {
  const getConfirmation = useGetConfirmation()
  const { toggleIsEditing } = useEditRecords()

  const action = async () => {
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

  const buttonProps: DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > = {
    ...rest,
    title: 'Сохранить изменения',
  }

  return {
    action,
    buttonProps,
    element: <FaCheck className='w-6 h-6 ' />,
  }
}
