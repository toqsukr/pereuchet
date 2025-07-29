import { create } from 'zustand'

type EditRecordStore = {
  isEditing: boolean
  updateIsEditing: (isEditing: boolean) => void
  toggleIsEditing: () => void
}

export const useEditRecords = create<EditRecordStore>((set, get) => ({
  isEditing: false,
  updateIsEditing: isEditing => set({ ...get(), isEditing }),
  toggleIsEditing: () => set({ ...get(), isEditing: !get().isEditing }),
}))
