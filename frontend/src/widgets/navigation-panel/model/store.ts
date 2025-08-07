import { create } from 'zustand'

type NavigationMenuStore = {
  isShow: boolean
  updateShow: (isShow: boolean) => void
  toggleShow: () => void
}

export const useNavigationMenu = create<NavigationMenuStore>((set, get) => ({
  isShow: false,
  updateShow: isShow => set({ ...get(), isShow }),
  toggleShow: () => set({ ...get(), isShow: !get().isShow }),
}))
