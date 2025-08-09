import { useEditRecords } from '@features/edit-records'
import DynamicRow, { type DynamicRowProps } from './dynamic-row'
import StaticRow from './static-row'

type RecordRowProps = DynamicRowProps

export const RecordRow = (props: RecordRowProps) => {
  const { isEditing } = useEditRecords()

  if (!isEditing) return <StaticRow recordData={props.record} />

  return <DynamicRow {...props} />
}
