'use client'
import { useEffect, useState } from 'react'

import Image from 'next/image'

import { useCartBoundStore } from '@/store'
import { QuantitySelector } from '@/components'
import Link from 'next/link'

export const ProductsInCart = () => {
  const [loaded, setLoaded] = useState(false)
  const productsInCart = useCartBoundStore((state) => state.cart)

  useEffect(() => {
    setLoaded(true)
  }, [])

  if (!loaded) {
    return <div>Loading...</div>
  }

  return (
    <>
      {productsInCart.map((product, i) => (
        <div key={`${product.slug}-${product.size}`} className='mb-5 flex'>
          <Image
            src={`/products/${product.image}`}
            width={100}
            height={100}
            alt={product.title}
            className='mr-5 rounded'
            style={{
              width: '100px',
              height: '100px',
            }}
          />
          <div>
            <Link
              className='cursor-pointer hover:underline'
              href={`/product/${product.slug}`}
            >
              <p>
                {product.size} - {product.title}
              </p>
            </Link>
            <p>${product.price}</p>
            <QuantitySelector
              quantity={3}
              stock={5}
              onSetQuantity={(value) => console.log(value)}
            />
            <button className='mt-3 underline'>Remove</button>
          </div>
        </div>
      ))}
    </>
  )
}
