import classNames from 'classnames'
import { type FC, type PropsWithChildren } from 'react'
import { Link, type LinkProps } from 'react-router-dom'

export const NavigationLink: FC<PropsWithChildren<LinkProps>> = ({ className, ...props }) => {
  return <Link {...props} className={classNames('', className)} />
}
