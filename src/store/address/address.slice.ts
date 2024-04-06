import { type Address } from '@/interfaces'
import { StateCreator } from 'zustand'
import { persist } from 'zustand/middleware'

export interface AddressSlice {
  // Properties
  address: {
    firstName: string
    lastName: string
    address: string
    address2?: string
    postalCode: string
    city: string
    country: string
    telephone: string
    rememberAddress: boolean
  }

  // Methods
  setAddress: (address: Address) => void
}

export const createAddressSlice: StateCreator<
  AddressSlice,
  [['zustand/devtools', never], ['zustand/immer', never]],
  [['zustand/persist', AddressSlice]]
> = persist(
  (set, get) => ({
    // Properties
    address: {
      firstName: '',
      lastName: '',
      address: '',
      address2: '',
      postalCode: '',
      city: '',
      country: '',
      telephone: '',
      rememberAddress: false,
    },

    // Methods
    setAddress: (address: Address) => {
      set({ address: address })
    },
  }),
  {
    name: 'address-storage',
  }
)
