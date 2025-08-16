import type { DetailedHTMLProps } from 'react'
import { RxCross2 } from 'react-icons/rx'
import { useEditTable } from './store'

export const useCancelChangesButton = (options: { onCancel?: () => void }) => {
  const { toggleIsEditing } = useEditTable()

  const action = () => {
    toggleIsEditing()
    options.onCancel?.()
  }

  const buttonProps: DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > = {
    title: 'Отменить изменения',
  }

  return {
    action,
    buttonProps,
    element: <RxCross2 className='w-6 h-6 scale-120' />,
  }
}
