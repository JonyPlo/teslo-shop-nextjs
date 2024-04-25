import { ProductImage } from '@/components/product/product-image/ProductImage'
import type { Product } from '@/interfaces'
import Image from 'next/image'
import Link from 'next/link'

interface Props {
  product: Product
}

export const ProductGridItem = ({ product }: Props) => {
  return (
    <div className='fade-in'>
      <div className='h-[85%] overflow-hidden'>
        <Link href={`/product/${product.slug}`} className='relative'>
          {/* Front image */}
          <ProductImage
            src={product.images[0]}
            alt={`${product.title}`}
            className='absolute h-full rounded object-cover duration-150 ease-in-out hover:opacity-0'
            width={500}
            height={500}
          />
          {/* Back image */}
          <ProductImage
            src={product.images[1]}
            alt={`${product.title}`}
            className='h-full rounded-md object-cover'
            width={500}
            height={500}
          />
        </Link>
      </div>

      <div className='flex flex-col py-4'>
        <Link className='hover:text-blue-600' href={`/product/${product.slug}`}>
          {product.title}
        </Link>
        <span className='font-bold'>${product.price}</span>
      </div>
    </div>
  )
}
