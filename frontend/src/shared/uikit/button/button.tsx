import cn from 'classnames'
import type { DetailedHTMLProps, FC, PropsWithChildren } from 'react'
import css from './button.module.scss'

const Button: FC<
  PropsWithChildren<
    DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>
  >
> = ({ children, className, ...props }) => {
  return (
    <button {...props} className={cn(css.button, className)}>
      {children}
    </button>
  )
}

export default Button
