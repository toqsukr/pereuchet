import cn from 'classnames'
import type { DetailedHTMLProps, FC, InputHTMLAttributes } from 'react'
import { LuArchiveRestore, LuArchiveX } from 'react-icons/lu'

type DeleteRestoreButtonProps = DetailedHTMLProps<
  InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
> & {
  onToggle: () => void
}

const DeleteRestoreButton: FC<DeleteRestoreButtonProps> = ({ onToggle, className, ...props }) => {
  return (
    <button onClick={onToggle} className={cn('hover:opacity-80 transition-opacity', className)}>
      <input {...props} className='hidden' type='checkbox' />
      {props.checked ? (
        <LuArchiveRestore className='w-[22px] h-[22px] text-[var(--primary-color)]' />
      ) : (
        <LuArchiveX className='w-[22px] h-[22px] text-red-600' />
      )}
    </button>
  )
}

export default DeleteRestoreButton
