'use client'

// Este client componente se crea en este path dentro de app y no en otra carpeta como por ejemplo Components porque es un componente que no se reutiliza en ningun lado, solamente sera llamado dentro de su archivo page.tsx correspondiente (./src/app/(shop)/product/[slug]/page.tsx), entonces como esta muy relacionado con esa pagina y no se reutiliza, entonces se lo crea en el mismo path para que esten juntos y el codigo sea mas mantenible

import { useState } from 'react'

import { useCartBoundStore, useProductBoundStore } from '@/store'
import {
  DangerAlertDialog,
  QuantitySelector,
  SizeSelector,
  Spinner,
} from '@/components'
import type { CartProduct, Product, Size } from '@/interfaces'
import { IoCartOutline } from 'react-icons/io5'
import { cn } from '@/utils'

interface Props {
  product: Product
}

export const AddToCart = ({ product }: Props) => {
  const [size, setSize] = useState<Size | undefined>()
  const [quantity, setQuantity] = useState<number>(1)
  const [posted, setPosted] = useState(false)
  const [showAlertDialog, setShowAlertDialog] = useState<boolean>(false)

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
    setShowAlertDialog(true)

    if (!showAlertDialog) {
      const alertTime = setInterval(() => {
        setShowAlertDialog(false)
        clearInterval(alertTime)
      }, 1000 * 5)
    }
  }

  return (
    <>
      {posted && !size && (
        <DangerAlertDialog text={'You must select a size*'} />
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
          {stock === 0 ? 'Out of stock' : 'Add to cart'}
        </button>
      )}
      {/* Alert Dialog */}
      <div
        className={cn(
          // Base Styles
          'alert-dialog-position fixed bottom-3 z-10 flex w-full max-w-fit items-center rounded-lg bg-gray-100 p-3 text-gray-600 shadow',
          // Fade in out animation
          {
            'opacity-100 duration-300': showAlertDialog,
            'opacity-0 duration-300': !showAlertDialog,
          }
        )}
      >
        <IoCartOutline size={30} className='animate-wiggle text-blue-700' />
        <span className='mx-3 text-sm font-normal'>Product added to cart.</span>
      </div>
    </>
  )
}
