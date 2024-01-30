import { StateCreator, create } from 'zustand'
import { devtools } from 'zustand/middleware'
import { immer } from 'zustand/middleware/immer'

interface UiState {
  // States
  isSideMenuOpen: boolean

  //Actions
  openSideMenu: () => void
  closeSideMenu: () => void
}

const storeAPI: StateCreator<
  UiState,
  [
    ['zustand/devtools', never],
    ['zustand/immer', never]
  ]
> = (set) => ({
  // States
  isSideMenuOpen: false,

  //Actions
  openSideMenu: () => set({ isSideMenuOpen: true }),
  closeSideMenu: () => set({ isSideMenuOpen: false }),
})

export const useUiStore = create<UiState>()(
  devtools(
    immer(
      storeAPI
    )
  )
)