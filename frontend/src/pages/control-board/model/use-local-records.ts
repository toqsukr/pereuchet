import { useRecords, type TRecord } from '@entities/record'
import { useState } from 'react'

export const useLocalRecords = () => {
  const { data: records } = useRecords()
  const [localRecords, setLocalRecords] = useState(() => records)

  const updateRecord = (record: TRecord) => {
    setLocalRecords(prev =>
      prev?.map(savedValue => (savedValue.id === record.id ? record : savedValue))
    )
  }

  return { localRecords, updateRecord }
}
