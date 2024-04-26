'use client'

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
import { toggleShowToast } from '@/utils'
import { createAdapterCartProduct } from '@/adapters'
import { GET_ADDED_TO_CART_TOAST_MESSAGE } from '@/components/ui/toast-notification/constants/toast.constants'
import {
  ADD_TO_CART,
  OUT_OF_STOCK,
  SIZE_EMPTY_MESSAGE,
} from '@/app/(shop)/cart/constants/cart.constants'
import { DANGER_ALERT_TYPE } from '@/components/ui/alert/constants/alert.constants'

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

  const ADDED_TO_CART_TOAST_MESSAGE = GET_ADDED_TO_CART_TOAST_MESSAGE(
    product.title
  )

  return (
    <>
      {posted && !size && (
        <Alert
          alertMessage={SIZE_EMPTY_MESSAGE}
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
        <div className='my-5 ml-[3.8rem]'>
          <Spinner />
        </div>
      ) : (
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
