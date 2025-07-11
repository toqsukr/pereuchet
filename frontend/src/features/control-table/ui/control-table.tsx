import cn from 'classnames'
import { forwardRef } from 'react'
import { Spreadsheet, type CellBase, type Props } from 'react-spreadsheet'
import { useSlicedData } from '../model/use-sliced-data'

export const ControlTable = forwardRef<unknown, Props<CellBase>>((props, ref) => {
  const slicedData = useSlicedData(props.data)
  return (
    <Spreadsheet
      {...props}
      ref={ref}
      data={slicedData}
      darkMode
      className={cn('w-full flex', props.className)}
    />
  )
})
