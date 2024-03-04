'use client'

// Este client componente se crea en este path dentro de app y no en otra carpeta como por ejemplo Components porque es un componente que no se reutiliza en ningun lado, solamente sera llamado dentro de su archivo page.tsx correspondiente (./src/app/(shop)/product/[slug]/page.tsx), entonces como esta muy relacionado con esa pagina y no se reutiliza, entonces se lo crea en el mismo path para que esten juntos y el codigo sea mas mantenible

import { useState } from 'react'
import { useCartBoundStore, useProductBoundStore } from '@/store'
import {
  Alert,
  QuantitySelector,
  SizeSelector,
  Spinner,
  ToastNotification,
} from '@/components'
import type { CartProduct, Product, Size } from '@/interfaces'
import {
  ADD_TO_CART,
  DANGER_ALERT_MESSAGE,
  DANGER_ALERT_TYPE,
  GET_ADDED_TO_CART_TOAST_MESSAGE,
  OUT_OF_STOCK,
} from '@/constants'
import { toggleShowToast } from '@/utils'
import { createAdapterCartProduct } from '@/adapters'

interface Props {
  product: Product
}

export const AddToCart = ({ product }: Props) => {
  const [size, setSize] = useState<Size | undefined>()
  const [quantity, setQuantity] = useState<number>(1)
  const [posted, setPosted] = useState(false)
  const [showToastState, setShowToastState] = useState<boolean>(false)

  const { stock, isLoading } = useProductBoundStore()
  const { setProductToCart } = useCartBoundStore()

  const addToCart = () => {
    setPosted(true)
    if (!size) return

    const cartProduct: CartProduct = createAdapterCartProduct({
      product,
      quantity,
      size,
    })

    setProductToCart(cartProduct)
    setPosted(false)
    setQuantity(1)
    setSize(undefined)
    setShowToastState(true)
    toggleShowToast({ showToastState, setShowToastState })
  }

  // Toast constants
  const ADDED_TO_CART_TOAST_MESSAGE = GET_ADDED_TO_CART_TOAST_MESSAGE(
    product.title
  )

  return (
    <>
      {posted && !size && (
        <Alert
          alertMessage={DANGER_ALERT_MESSAGE}
          alertType={DANGER_ALERT_TYPE}
        />
      )}
      {/* Sizes selector */}
      <SizeSelector
        selectedSize={size}
        availableSizes={product.sizes}
        onSetSize={setSize}
      />
      {/* Quantity selector */}
      <QuantitySelector
        quantity={quantity}
        onSetQuantity={setQuantity}
        stock={stock}
      />
      {/* Button */}
      {isLoading ? (
        // Spinner
        <div className='my-5 ml-[3.8rem]'>
          <Spinner />
        </div>
      ) : (
        // Add to cart button
        <button
          className='btn-primary my-5 text-center disabled:bg-gray-500'
          disabled={stock === 0}
          onClick={addToCart}
        >
          {stock === 0 ? OUT_OF_STOCK : ADD_TO_CART}
        </button>
      )}
      {/* Toast Notification */}
      <ToastNotification
        toastMessage={ADDED_TO_CART_TOAST_MESSAGE}
        showToastState={showToastState}
      />
    </>
  )
}
