import { memo, useMemo, type ReactNode } from 'react'
import { Virtuoso, type VirtuosoProps } from 'react-virtuoso'
import { TableCell } from './table-cell'

function getCellsDefault<TData extends object>(_row: number, dataObject: TData): ReactNode {
  return Object.values(dataObject).map(value => <TableCell key={value}>{value}</TableCell>)
}

type ControlTableProps<TData extends object, TLabel extends readonly string[]> = {
  columnLabels: TLabel
} & VirtuosoProps<TData | TLabel, unknown> &
  Pick<TableItemProps<TData, TLabel>, 'getCells'>

export const ControlTable = memo(
  <TData extends object, TLabel extends readonly string[]>(
    props: ControlTableProps<TData, TLabel>
  ) => {
    const { data, columnLabels, getCells, ...rest } = props
    const tableData = useMemo(() => [columnLabels, ...(data ?? [])], [data, columnLabels])

    return (
      <Virtuoso
        {...rest}
        data={tableData}
        topItemCount={1}
        increaseViewportBy={{ top: 250, bottom: 250 }}
        className='w-full bg-[var(--content-field-color)] text-lg rounded-2xl'
        components={{ List: props => <div {...props} className='flex flex-col'></div> }}
        itemContent={(index, record) => (
          <TableItem itemIndex={index} objectData={record} getCells={getCells} />
        )}
      />
    )
  }
) as <TData extends object, TLabel extends readonly string[]>(
  props: ControlTableProps<TData, TLabel>
) => ReactNode

type TableItemProps<TData extends object, TLabel extends readonly string[]> = {
  itemIndex: number
  objectData: TData | TLabel
  getCells?: (row: number, dataObject: TData) => ReactNode
}

const TableItem = <TData extends object, TLabel extends readonly string[]>(
  props: TableItemProps<TData, TLabel>
) => {
  const { itemIndex, objectData, getCells } = props
  const defineCellFn = getCells ?? getCellsDefault

  return (
    <div
      className='grid h-full w-full'
      style={{ gridTemplateColumns: `repeat(${Object.values(objectData).length}, 1fr)` }}>
      {objectData instanceof Array
        ? objectData.map(value => (
            <TableCell isLabel key={value}>
              {value}
            </TableCell>
          ))
        : defineCellFn(itemIndex, objectData)}
    </div>
  )
}
