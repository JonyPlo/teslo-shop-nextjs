'use client'

import { Product } from '@/interfaces'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'

interface Props {
  product: Product
}

export const ProductGridItem = ({ product }: Props) => {
  const [displayImage, setDisplayImage] = useState(product.images[0])

  return (
    <div className='overflow-hidden fade-in'>
      <Link href={`/product/${product.slug}`}>
        <Image
          src={`/products/${displayImage}`}
          alt={`${product.title}`}
          className='w-full object-cover rounded'
          width={500}
          height={500}
          onMouseEnter={() => setDisplayImage(product.images[1])}
          onMouseLeave={() => setDisplayImage(product.images[0])}
          priority
        />
      </Link>

      <div className='p-4 flex flex-col'>
        <Link className='hover:text-blue-600' href={`/product/${product.slug}`}>
          {product.title}
        </Link>
        <span className='font-bold'>${product.price}</span>
      </div>
    </div>
  )
}
