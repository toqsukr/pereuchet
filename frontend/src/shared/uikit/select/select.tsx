import cn from 'classnames'
import { type FC, type HTMLProps, type PropsWithChildren } from 'react'
import css from './select.module.scss'

const Option: FC<PropsWithChildren<HTMLProps<HTMLOptionElement>>> = ({
  children,
  className,
  ...props
}) => {
  return (
    <option {...props} className={cn(css.option, className)}>
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
    <div className={cn(css.container, className)}>
      <select {...props} className={css.select}>
        {children}
      </select>
      <div className={css.picker_icon}>
        <img src='/arrow.svg' className='w-4 h-4' />
      </div>
    </div>
  )
}

Select.Option = Option

export default Select
