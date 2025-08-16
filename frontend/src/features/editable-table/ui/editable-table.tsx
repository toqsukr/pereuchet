import { memo, useMemo, type ReactNode } from 'react'
import { Virtuoso, type VirtuosoProps } from 'react-virtuoso'
import { useUnmountEditCancel } from '../model/use-unmount-edit-cancel'
import { TableCell } from './table-cell'

const DEFAULT_MIN_COLUMN_SIZE = '140px'
const DEFAULT_MAX_COLUMN_SIZE = '1fr'

type MinMaxSizes = {
  [key: string]:
    | {
        min: `${number}rem` | `${number}px`
        max?: `${number}rem` | `${number}px`
      }
    | {
        min?: `${number}rem` | `${number}px`
        max: `${number}rem` | `${number}px`
      }
}

function getCellsDefault<TData extends object>(_row: number, dataObject: TData): ReactNode {
  return Object.values(dataObject).map(value => <TableCell key={value}>{value}</TableCell>)
}

type EditableTableProps<TData extends object, TLabel extends readonly string[]> = {
  columnLabels: TLabel
} & VirtuosoProps<TData | TLabel, unknown> &
  Pick<TableItemProps<TData, TLabel>, 'getCells' | 'columnSizes'>

export const EditableTable = memo(
  <TData extends object, TLabel extends readonly string[]>(
    props: EditableTableProps<TData, TLabel>
  ) => {
    const { data, columnLabels, getCells, columnSizes, ...rest } = props
    const tableData = useMemo(() => [columnLabels, ...(data ?? [])], [data, columnLabels])

    useUnmountEditCancel()

    return (
      <Virtuoso
        {...rest}
        data={tableData}
        topItemCount={1}
        increaseViewportBy={{ top: 250, bottom: 250 }}
        className='w-full bg-[var(--content-field-color)] rounded-2xl text-base'
        components={{ List: props => <div {...props} className='flex flex-col'></div> }}
        itemContent={(index, record) => (
          <TableItem
            itemIndex={index}
            objectData={record}
            getCells={getCells}
            columnSizes={columnSizes}
          />
        )}
      />
    )
  }
) as <TData extends object, TLabel extends readonly string[]>(
  props: EditableTableProps<TData, TLabel>
) => ReactNode

type TableItemProps<TData extends object, TLabel extends readonly string[]> = {
  itemIndex: number
  objectData: TData | TLabel
  columnSizes?: MinMaxSizes
  getCells?: (row: number, dataObject: TData) => ReactNode
}

const defineColumns = (objectData: object, minMaxSizes?: MinMaxSizes) => {
  const dataValues = Object.values(objectData)

  if (!minMaxSizes)
    return `repeat(${dataValues.length}, minmax(${DEFAULT_MIN_COLUMN_SIZE}, ${DEFAULT_MAX_COLUMN_SIZE}))`

  const sizes = Object.values(minMaxSizes)

  const mappedSizes = sizes.map(
    size => `minmax(${size.min ?? DEFAULT_MIN_COLUMN_SIZE}, ${size.max ?? DEFAULT_MAX_COLUMN_SIZE})`
  )

  const sizeDiff = dataValues.length - sizes.length

  if (sizeDiff <= 0) return mappedSizes.join(' ')

  return mappedSizes
    .concat(
      new Array(sizeDiff).fill(`minmax(${DEFAULT_MIN_COLUMN_SIZE}, ${DEFAULT_MAX_COLUMN_SIZE})`)
    )
    .join(' ')
}

const TableItem = <TData extends object, TLabel extends readonly string[]>(
  props: TableItemProps<TData, TLabel>
) => {
  const { itemIndex, objectData, getCells, columnSizes } = props
  const defineCellFn = getCells ?? getCellsDefault

  if (objectData instanceof Array)
    return (
      <div
        className='grid h-full w-full'
        style={{
          gridTemplateColumns: defineColumns(objectData, columnSizes),
        }}>
        {objectData.map(value => (
          <TableCell isLabel key={value}>
            {value}
          </TableCell>
        ))}
      </div>
    )

  return (
    <div
      className='grid h-full w-full'
      style={{
        gridTemplateColumns: defineColumns(objectData, columnSizes),
      }}>
      {defineCellFn(itemIndex, objectData)}
    </div>
  )
}
