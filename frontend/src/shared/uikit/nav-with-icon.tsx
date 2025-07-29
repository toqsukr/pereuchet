import cn from 'classnames'
import { type DetailedHTMLProps, type FC, type HTMLAttributes, type ReactNode } from 'react'

export type NavWithIconProp = {
  Icon: ReactNode
  active?: boolean
} & DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>

const NavWithIcon: FC<NavWithIconProp> = ({ Icon, active, ...props }) => {
  return (
    <div
      {...props}
      className={cn(
        'text-[#ffffff25] transition-colors bg-[var(--background-color)] rounded-2xl p-4',
        {
          ['text-white bg-[var(--primary-color)]']: active,
        }
      )}>
      {Icon}
    </div>
  )
}

export default NavWithIcon
