import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import { immer } from 'zustand/middleware/immer'
import { UiSlice, createUiSlice } from './ui.slice'

// Slices Type - type ShareState = ExampleSlice & ExampleSlice ...
type ShareState = UiSlice

// States and Actions
export const useUiBoundStore = create<ShareState>()(
  devtools(
    immer((...a) => ({
      ...createUiSlice(...a),
    }))
  )
)
