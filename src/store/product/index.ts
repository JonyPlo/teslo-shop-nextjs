import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import { immer } from 'zustand/middleware/immer'
import { ProductSlice, createProductSlice } from './product.slice'

// Slices Type - type ShareState = ExampleSlice & ExampleSlice ...
type ShareState = ProductSlice

// States and Actions
export const useProductBoundStore = create<ShareState>()(
  devtools(
    immer((...a) => ({
      ...createProductSlice(...a),
    }))
  )
)
