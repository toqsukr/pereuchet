import cn from 'classnames'
import type { FC, HTMLProps, PropsWithChildren } from 'react'
import css from './select.module.scss'

const Option: FC<PropsWithChildren<HTMLProps<HTMLOptionElement>>> = ({
  children,
  className,
  ...props
}) => {
  return (
    <option {...props} className={cn('text-white font-medium p-4 truncate', className)}>
      {children}
    </option>
  )
}

const Select = ({
  children,
  className,
  ...props
}: PropsWithChildren<HTMLProps<HTMLSelectElement>>) => {
  return (
    <select {...props} className={cn(css.select, className)}>
      {children}
    </select>
  )
}

Select.Option = Option

export default Select
