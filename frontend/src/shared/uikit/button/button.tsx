import type { DetailedHTMLProps, FC, PropsWithChildren } from 'react'
import css from './button.module.scss'

const Button: FC<
  PropsWithChildren<
    DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>
  >
> = ({ children, ...props }) => {
  return (
    <button {...props} className={css.button}>
      {children}
    </button>
  )
}

export default Button
