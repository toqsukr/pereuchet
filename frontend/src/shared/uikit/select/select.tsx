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
      <select {...props} className={cn(css.select, className)}>
        {children}
      </select>
      <div className={css.picker_icon}>
        <svg
          className='w-4 h-4'
          width='13'
          height='6'
          viewBox='0 0 13 6'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'>
          <path
            d='M1 1L6.5 5L12 1'
            stroke='currentColor'
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
        </svg>
      </div>
    </div>
  )
}

Select.Option = Option

export default Select
