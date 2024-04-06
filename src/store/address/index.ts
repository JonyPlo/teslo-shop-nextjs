import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import { immer } from 'zustand/middleware/immer'
import { AddressSlice, createAddressSlice } from './address.slice'

// Slices Type - type ShareState = ExampleSlice & ExampleSlice ...
type ShareState = AddressSlice

// States and Actions
export const useAddressBoundStore = create<ShareState>()(
  devtools(
    immer((...a) => ({
      ...createAddressSlice(...a),
    }))
  )
)
