import cn from 'classnames'
import { type DetailedHTMLProps, type FC, type HTMLAttributes, type ReactNode } from 'react'
import css from './nav-with-icon.module.scss'

export type NavWithIconProp = {
  Icon: ReactNode
  active?: boolean
} & DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>

const NavWithIcon: FC<NavWithIconProp> = ({ Icon, active, ...props }) => {
  return (
    <div
      {...props}
      className={cn(css.nav_with_icon, {
        [css.inactive]: !active,
      })}>
      {Icon}
    </div>
  )
}

export default NavWithIcon
