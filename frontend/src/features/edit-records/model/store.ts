import type { TRecord } from '@entities/record'
import { create } from 'zustand'

type EditRecordStore = {
  isEditing: boolean
  editedRecords: TRecord[]
  toggleIsEditing: () => void
  updateEditedRecords: (editedRecords: TRecord[]) => void
  clearEditedRecords: () => void
}

export const useEditRecords = create<EditRecordStore>((set, get) => ({
  isEditing: false,
  editedRecords: [],
  toggleIsEditing: () => set({ ...get(), isEditing: !get().isEditing }),
  updateEditedRecords: editedRecords => set({ ...get(), editedRecords }),
  clearEditedRecords: () => set({ ...get(), editedRecords: [] }),
}))
