import type { CartProduct } from '@/interfaces'
import { StateCreator } from 'zustand'
import { persist } from 'zustand/middleware'

// Summary Information
interface SummaryInformation {
  productsInCartQuantity: number | undefined
  subTotalPrice: number
  taxes: number
  totalPriceWithTaxes: number
}

// Global states and Actions
export interface CartSlice {
  // Properties
  cart: CartProduct[]

  // Actions
  getTotalItems: () => number
  getSummaryInformation: () => SummaryInformation

  setProductToCart: (product: CartProduct) => void
  updateProductQuantity: (product: CartProduct, quantity: number) => void
  syncProductQuantityWithStock: (product: CartProduct, stock: number) => void
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

    getSummaryInformation: () => {
      const { cart, getTotalItems } = get()
      const productsInCartQuantity = getTotalItems()
      const subTotalPrice = cart.reduce(
        (subTotal, product) => product.quantity * product.price + subTotal,
        0
      )
      const taxes = subTotalPrice * 1
      const totalPriceWithTaxes = subTotalPrice + taxes

      return {
        productsInCartQuantity,
        subTotalPrice,
        taxes,
        totalPriceWithTaxes,
      }
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

    syncProductQuantityWithStock: (product: CartProduct, stock: number) => {
      set((state) => {
        state.cart.forEach((productInCart, i) => {
          if (productInCart.id === product.id) {
            // Si la cantidad del producto en el carrito es mayor que el stock en la db, ajustamos la cantidad al stock
            if (productInCart.quantity > stock) {
              state.cart[i].quantity = stock
            }

            // Actualizamos el stock del producto en el carrito con el stock actualizado de la db
            state.cart[i].inStock = stock
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
