import type { FC, HTMLProps, PropsWithChildren } from 'react'
import css from './select.module.scss'

const Option: FC<PropsWithChildren<HTMLProps<HTMLOptionElement>>> = ({ children, ...props }) => {
  return (
    <option {...props} className='text-white font-medium p-4 truncate'>
      {children}
    </option>
  )
}

const Select = ({ children, ...props }: PropsWithChildren<HTMLProps<HTMLSelectElement>>) => {
  return (
    <select {...props} className={css.select}>
      {children}
    </select>
  )
}

Select.Option = Option

export default Select
