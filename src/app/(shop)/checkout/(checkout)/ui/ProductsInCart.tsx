'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'

import Image from 'next/image'

import { useCartBoundStore } from '@/store'
import { currencyFormat } from '../../../../../utils/currencyFormat'
import { ProductImage } from '@/components'

export const ProductsInCart = () => {
  const [loaded, setLoaded] = useState(false)
  const { cart: productsInCart } = useCartBoundStore()

  useEffect(() => {
    setLoaded(true)
  }, [])

  if (!loaded) {
    return <div>Loading...</div>
  }

  return (
    <>
      <div className='flex flex-col'>
        <span className='text-xl'>Adjust elements</span>
        <Link href={'/cart'} className='mb-5 underline'>
          Edit cart
        </Link>
      </div>
      {productsInCart.map((product) => (
        <div
          key={`${product.slug}-${product.size}`}
          className='mb-10 flex flex-col items-center lg:relative lg:flex-row lg:items-start'
        >
          <ProductImage
            src={product.image}
            width={150}
            height={150}
            alt={product.title}
            className='w-40 rounded md:mr-5'
          />
          <div className='flex flex-col items-center lg:items-start '>
            <span>Quantity: {product.quantity}</span>
            <div className='my-1 h-0.5 w-full rounded-none bg-gray-200' />
            <p>
              {product.size} - {product.title}
            </p>

            <p className='mt-2 font-semibold'>
              {currencyFormat(product.price * product.quantity)}
            </p>
            <div className='text-center lg:absolute lg:bottom-0 lg:text-start'></div>
          </div>
        </div>
      ))}
    </>
  )
}
