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
import type { Product, Size } from '@/interfaces'

interface Props {
  product: Product
}

export const AddToCart = ({ product }: Props) => {
  const [size, setSize] = useState<Size | undefined>()
  const [quantity, setQuantity] = useState<number>(1)
  const [posted, setPosted] = useState(false)

  const { stock, isLoading } = useProductBoundStore((state) => state)
  const { setProductToCart } = useCartBoundStore()

  const addToCart = () => {
    setPosted(true)

    if (!size) return

    const { id, slug, title, price, images } = product

    const productInCart = {
      id,
      slug,
      title,
      price,
      image: images[0],
      quantity,
      size,
    }

    setProductToCart(productInCart)
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
    </>
  )
}
