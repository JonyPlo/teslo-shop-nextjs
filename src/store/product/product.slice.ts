import { StateCreator } from 'zustand'

export interface ProductSlice {
  // Properties
  stock: number
  isLoading: boolean

  // Actions
  setStock: (value: number) => void
  setIsLoading: (value: boolean) => void
}

// Without persist middleware
export const createProductSlice: StateCreator<
  ProductSlice,
  [['zustand/devtools', never], ['zustand/immer', never]]
> = (set) => ({
  // Properties
  stock: 0,
  isLoading: true,

  // Actions
  setStock: (value) => {
    set({ stock: value }, false, 'setStock')
  },

  setIsLoading: (value) => {
    set({ isLoading: value }, false, 'setIsLoading')
  },
})
