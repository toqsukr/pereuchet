import { create } from 'zustand'

type DateFilterStore = {
  isPeriod: boolean
  toggleIsPeriod: () => void
  filter: Date | [from: Date | null, to: Date | null] | null
  updateFilter: (filter: Date | [from: Date | null, to: Date | null] | null) => void
}

export const useDateFilter = create<DateFilterStore>((set, get) => ({
  isPeriod: false,
  toggleIsPeriod: () => set({ ...get(), isPeriod: !get().isPeriod }),
  filter: null,
  updateFilter: filter => set({ ...get(), filter }),
}))
