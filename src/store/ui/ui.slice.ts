import { StateCreator } from 'zustand'

export interface UiSlice {
  // Properties
  isSideMenuOpen: boolean

  // Actions
  setIsSideMenuOpen: () => void
}

export const createUiSlice: StateCreator<UiSlice> = (set, get) => ({
  // Properties
  isSideMenuOpen: false,

  // Actions
  setIsSideMenuOpen: () => {
    set({ isSideMenuOpen: !get().isSideMenuOpen })
  },
})
