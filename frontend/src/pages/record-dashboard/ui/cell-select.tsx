import Select from '@shared/uikit/select/select'
import cn from 'classnames'
import { memo, type FC, type HTMLProps, type PropsWithChildren } from 'react'

type CellSelectProps = HTMLProps<HTMLSelectElement> & {
  options: PropsWithChildren<HTMLProps<HTMLOptionElement>>[]
}

export const CellSelect: FC<CellSelectProps> = memo(({ options, className, ...props }) => {
  return (
    <div
      className={cn(
        'overflow-auto flex flex-col justify-center items-center border-r-2 border-b-2 border-[var(--background-color)]',
        className
      )}>
      <Select {...props} className={cn('bg-transparent! rounded-none!', className)}>
        {options?.map((props, idx) => (
          <Select.Option {...props} key={idx} />
        ))}
      </Select>
    </div>
  )
})
