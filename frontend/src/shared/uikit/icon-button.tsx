import Button from '@shared/uikit/button/button'
import type { DetailedHTMLProps, FC, ReactNode } from 'react'
import Spinner from './spinner'

export type IconButtonProps = {
  isLoading?: boolean
  Icon: ReactNode
} & DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>

export const IconButton: FC<IconButtonProps> = ({ isLoading, Icon, disabled, ...props }) => {
  return (
    <Button {...props} disabled={disabled || isLoading}>
      <div className='flex justify-center items-center'>{isLoading ? <Spinner /> : Icon}</div>
    </Button>
  )
}
