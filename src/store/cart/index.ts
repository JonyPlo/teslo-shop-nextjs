import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import { immer } from 'zustand/middleware/immer'
import { CartSlice, createCartSlice } from './cart-store.slice'

// Slices Type - type ShareState = ExampleSlice & ExampleSlice ...
type ShareState = CartSlice

// States and Actions
export const useCartBoundStore = create<ShareState>()(
  devtools(
    immer((...a) => ({
      ...createCartSlice(...a),
    }))
  )
)
