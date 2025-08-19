import { useStampists } from '@entities/stampist'
import { EditableTable } from '@features/editable-table'
import { zodResolver } from '@hookform/resolvers/zod'
import { arrayToRecordWithID } from '@shared/lib/transform'
import { useCallback, useMemo } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import type { TStampistShownData } from './model/type'
import { useTableData } from './model/use-table-data'
import ControlPanel from './ui/control-panel'
import { StampistRow } from './ui/stampist-row'

const productTableLabels = ['ID', 'Имя'] as const

const columnSizes = {
  0: { min: '8rem' },
  1: { min: '8rem' },
} as const

const StampistFormSchema = z.record(
  z.object({
    id: z.coerce.number(),
    name: z.string().min(1),
    isDeleted: z.boolean(),
  })
)

const StampistDashboardPage = () => {
  const { data: stampists } = useStampists()

  const formSettings = useForm({
    mode: 'onChange',
    resolver: zodResolver(StampistFormSchema),
    defaultValues: arrayToRecordWithID(stampists),
  })

  const tableData = useTableData(stampists)

  const memoizedControl = useMemo(() => formSettings.control, [formSettings.control])
  const memoizedSetFormState = useCallback(formSettings.setValue, [formSettings.setValue])

  const memoizedGetCells = useCallback(
    (_row: number, value: TStampistShownData) => (
      <StampistRow
        key={value.id}
        stampist={value}
        control={memoizedControl}
        setFormState={memoizedSetFormState}
      />
    ),
    [memoizedControl, memoizedSetFormState, formSettings]
  )

  return (
    <div className='flex flex-col gap-5 w-full h-full justify-self-center'>
      <ControlPanel formSettings={formSettings} tableData={stampists} />
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

export default StampistDashboardPage
