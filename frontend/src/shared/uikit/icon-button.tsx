import Button from '@shared/uikit/button/button'
import cn from 'classnames'
import type { DetailedHTMLProps, FC, ReactNode } from 'react'
import Spinner from './spinner'

type IconButtonProps = {
  isLoading?: boolean
  Icon: ReactNode
} & DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>

export const IconButton: FC<IconButtonProps> = ({ isLoading, Icon, className, ...props }) => {
  return (
    <Button {...props} disabled={props.disabled || isLoading}>
      <div className={cn('flex justify-center items-center', className)}>
        {isLoading ? <Spinner /> : Icon}
      </div>
    </Button>
  )
}
