import type { CartProduct } from '@/interfaces'
import { StateCreator } from 'zustand'
import { persist } from 'zustand/middleware'

export interface CartSlice {
  // Properties
  cart: CartProduct[]

  // Actions
  getTotalItems: () => number
  setProductToCart: (product: CartProduct) => void
  updateProductQuantity: (product: CartProduct, quantity: number) => void
  removeProduct: (product: CartProduct) => void
}

// With persist middleware
export const createCartSlice: StateCreator<
  CartSlice,
  [['zustand/devtools', never], ['zustand/immer', never]],
  [['zustand/persist', CartSlice]]
> = persist(
  (set, get) => ({
    // Properties
    cart: [],

    // Actions
    getTotalItems: () => {
      const { cart } = get()
      return cart.reduce((total, item) => total + item.quantity, 0)
    },

    setProductToCart: (product: CartProduct) => {
      const { cart } = get()

      // Revisar si el product existe en el carrito con la talla seleccionada
      const productInCart = cart.some(
        (productInCart) =>
          productInCart.id === product.id && productInCart.size === product.size
      )

      if (!productInCart) {
        return set((state) => {
          // Recordar que estoy mutando el estado porque estoy usando immer
          state.cart.push(product)
        })
      }

      // Si el producto ya existe en el carrito entonces solo incremento la cantidad
      set((state) => {
        cart.forEach((productInCart, i) => {
          if (
            productInCart.id === product.id &&
            productInCart.size === product.size
          ) {
            state.cart[i].quantity += product.quantity
          }
        })
      })
    },

    updateProductQuantity: (product: CartProduct, quantity: number) => {
      set((state) => {
        state.cart.forEach((productInCart, i) => {
          if (
            productInCart.id === product.id &&
            productInCart.size === product.size
          ) {
            state.cart[i].quantity = quantity
          }
        })
      })
    },

    removeProduct: (product: CartProduct) => {
      set((state) => {
        state.cart.forEach((productInCart, i) => {
          if (
            productInCart.id === product.id &&
            productInCart.size === product.size
          ) {
            state.cart.splice(i, 1)
          }
        })
      })
    },
  }),
  {
    name: 'cart',
  }
)
