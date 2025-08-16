import { create } from 'zustand'

type EditTableStore = {
  isEditing: boolean
  updateIsEditing: (isEditing: boolean) => void
  toggleIsEditing: () => void
}

export const useEditTable = create<EditTableStore>((set, get) => ({
  isEditing: false,
  updateIsEditing: isEditing => set({ ...get(), isEditing }),
  toggleIsEditing: () => set({ ...get(), isEditing: !get().isEditing }),
}))
