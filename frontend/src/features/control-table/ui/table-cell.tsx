import cn from 'classnames'
import type { DetailedHTMLProps, FC, HTMLAttributes, PropsWithChildren } from 'react'

type TableCellProp = DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> & {
  isLabel?: boolean
}

export const TableCell: FC<PropsWithChildren<TableCellProp>> = ({
  children,
  isLabel,
  className,
  ...props
}) => {
  return (
    <div
      {...props}
      className={cn(
        'bg-[var(--content-field-color)] p-4 border-r-2 border-b-2 border-[var(--background-color)]!',
        { ['bg-[#2f3447]!']: isLabel },
        className
      )}>
      {children}
    </div>
  )
}
