import { useTreads } from '@entities/tread'
import { EditableTable } from '@features/editable-table'
import { zodResolver } from '@hookform/resolvers/zod'
import { arrayToRecordWithID } from '@shared/lib/transform'
import { useCallback, useMemo } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import type { TTreadShownData } from './model/type'
import { useTableData } from './model/use-table-data'
import ControlPanel from './ui/control-panel'
import { TreadRow } from './ui/tread-row'

const productTableLabels = ['Код', 'Название'] as const

const columnSizes = {
  0: { min: '14rem' },
  1: { min: '14rem' },
} as const

const TreadFormSchema = z.record(
  z.object({
    code: z.string(),
    name: z.string().min(1),
    isDeleted: z.boolean(),
  })
)

const TreadDashboardPage = () => {
  const { data: treads } = useTreads()

  const formSettings = useForm({
    mode: 'onChange',
    resolver: zodResolver(TreadFormSchema),
    defaultValues: arrayToRecordWithID(treads?.map(tread => ({ ...tread, id: tread.code }))),
  })

  const tableData = useTableData(treads)

  const memoizedControl = useMemo(() => formSettings.control, [formSettings.control])
  const memoizedSetFormState = useCallback(formSettings.setValue, [formSettings.setValue])

  const memoizedGetCells = useCallback(
    (_row: number, value: TTreadShownData) => (
      <TreadRow
        key={value.code}
        tread={value}
        control={memoizedControl}
        setFormState={memoizedSetFormState}
      />
    ),
    [memoizedControl, memoizedSetFormState, formSettings]
  )

  return (
    <div className='flex flex-col gap-5 w-full h-full justify-self-center'>
      <ControlPanel formSettings={formSettings} tableData={treads} />
      <div className='flex h-full w-full gap-12 rounded-2xl'>
        <EditableTable
          data={tableData}
          columnSizes={columnSizes}
          columnLabels={productTableLabels}
          getCells={memoizedGetCells}
        />
      </div>
    </div>
  )
}

export default TreadDashboardPage
