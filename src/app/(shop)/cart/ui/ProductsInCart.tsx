'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'

import Image from 'next/image'

import { useCartBoundStore } from '@/store'
import { QuantitySelector } from '@/components'
import { IoCartOutline } from 'react-icons/io5'

export const ProductsInCart = () => {
  const [loaded, setLoaded] = useState(false)
  const {
    cart: productsInCart,
    updateProductQuantity,
    removeProduct,
  } = useCartBoundStore()

  useEffect(() => {
    setLoaded(true)
  }, [])

  if (!loaded) {
    return <div>Loading...</div>
  }

  if (productsInCart.length <= 0) {
    return (
      <div className='flex min-h-full flex-col justify-between'>
        <div className='flex flex-col items-center sm:mt-5'>
          <IoCartOutline size={80} className='text-gray-500' />
          <h3 className='text-gray-500'>Start a shopping cart!</h3>
        </div>
        <div>
          <Link href={'/'} className='btn-primary mt-5 block text-center'>
            Discover products
          </Link>
        </div>
      </div>
    )
  }

  return (
    <>
      <div className='flex flex-col'>
        <span className='text-xl'>Add more items</span>
        <Link href={'/'} className='mb-5 underline'>
          Keep shopping
        </Link>
      </div>
      {productsInCart.map((product) => (
        <div
          key={`${product.slug}-${product.size}`}
          className='mb-10 flex flex-col items-center lg:relative lg:flex-row lg:items-start'
        >
          <Image
            src={`/products/${product.image}`}
            width={150}
            height={150}
            alt={product.title}
            className='w-40 rounded md:mr-5'
            priority
          />
          <div className='flex flex-col items-center lg:items-start '>
            <Link
              className='mt-5 cursor-pointer hover:underline lg:mt-0 '
              href={`/product/${product.slug}`}
            >
              <p className='truncate-product-title'>
                {product.size} - {product.title}
              </p>
            </Link>
            <p className='mt-2 font-semibold'>${product.price}</p>
            <div className='text-center lg:absolute lg:bottom-0 lg:text-start'>
              <QuantitySelector
                quantity={product.quantity}
                stock={100}
                onSetQuantity={(newQuantity) =>
                  updateProductQuantity(product, newQuantity)
                }
              />
              <button
                className='mt-2 underline'
                onClick={() => removeProduct(product)}
              >
                Remove
              </button>
            </div>
          </div>
        </div>
      ))}
    </>
  )
}
