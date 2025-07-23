import Select from '@shared/uikit/select/select'
import classNames from 'classnames'
import { memo, type FC, type HTMLProps, type PropsWithChildren } from 'react'

type CellSelectProps = HTMLProps<HTMLSelectElement> & {
  options: PropsWithChildren<HTMLProps<HTMLOptionElement>>[]
}

export const CellSelect: FC<CellSelectProps> = memo(({ options, className, ...props }) => {
  return (
    <Select
      {...props}
      className={classNames(
        'h-full! border-r-2 border-b-2 border-[var(--background-color)] bg-[var(--content-field-color)]! rounded-none!',
        className
      )}>
      {options?.map((props, idx) => (
        <Select.Option {...props} key={idx} />
      ))}
    </Select>
  )
})
