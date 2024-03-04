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
  ADDED_TO_CART_TOAST_OPTIONS,
  ADD_TO_CART,
  OUT_OF_STOCK,
  PRODUCT_SIZE_DANGER_ALERT_OPTIONS,
} from '@/constants'

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

    const { id, slug, title, price, images } = product

    const cartProduct: CartProduct = {
      id,
      slug,
      title,
      price,
      image: images[0],
      quantity,
      size,
    }

    setProductToCart(cartProduct)
    setPosted(false)
    setQuantity(1)
    setSize(undefined)
    setShowToastState(true)

    if (!showToastState) {
      const showToastTime = setInterval(() => {
        setShowToastState(false)
        clearInterval(showToastTime)
      }, 1000 * 5)
    }
  }

  // Alert options
  const { alertMessage, alertType } = PRODUCT_SIZE_DANGER_ALERT_OPTIONS

  // Toast options
  const { toastMessage, showToast } = ADDED_TO_CART_TOAST_OPTIONS({
    toastMessage: product.title,
    showToast: showToastState,
  })

  return (
    <>
      {posted && !size && (
        <Alert alertMessage={alertMessage} alertType={alertType} />
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
      <ToastNotification toastMessage={toastMessage} showToast={showToast} />
    </>
  )
}
