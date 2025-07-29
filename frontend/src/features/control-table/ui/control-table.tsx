import { memo, useMemo, type ReactNode } from 'react'
import { Virtuoso, type VirtuosoProps } from 'react-virtuoso'
import { TableCell } from './table-cell'

type ControlTableProps<TData, TLabel> = VirtuosoProps<TData | TLabel, unknown> & {
  columnLabels: TLabel
  getCells?: (row: number, value: TData) => ReactNode
}

export const ControlTable = memo(
  <TData extends object, TLabel extends readonly string[]>({
    data,
    columnLabels,
    getCells = (_, record) =>
      Object.values(record).map(value => <TableCell key={value}>{value}</TableCell>),
    ...props
  }: ControlTableProps<TData, TLabel>) => {
    const tableData = useMemo(() => [columnLabels, ...(data ?? [])], [data, columnLabels])

    return (
      <Virtuoso
        {...props}
        topItemCount={1}
        data={tableData}
        increaseViewportBy={{ top: 250, bottom: 250 }}
        style={{
          backgroundColor: 'var(--content-field-color)',
          fontSize: '1.15rem',
          height: '488px',
          width: '100%',
          borderRadius: '1rem',
        }}
        components={{ List: props => <div {...props} className='flex flex-col'></div> }}
        itemContent={(index, record) => (
          <div
            className='grid h-full w-full'
            style={{ gridTemplateColumns: `repeat(${Object.values(record).length}, 1fr)` }}>
            {record instanceof Array
              ? record.map(value => (
                  <TableCell isLabel key={value}>
                    {value}
                  </TableCell>
                ))
              : getCells(index, record)}
          </div>
        )}
      />
    )
  }
) as <TData extends object, TLabel extends readonly string[]>(
  props: ControlTableProps<TData, TLabel>
) => ReactNode
