import { create } from 'zustand'

type VirtualStore = {
  page: number
  incrementPage: () => void
  decrementPage: () => void
  updatePage: (page: number) => void
}

export const useVirtual = create<VirtualStore>((set, get) => ({
  page: 0,
  incrementPage: () => set({ ...get(), page: get().page + 1 }),
  decrementPage: () => set({ ...get(), page: get().page - 1 }),
  updatePage: page => set({ ...get(), page }),
}))
