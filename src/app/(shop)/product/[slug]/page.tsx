import { notFound } from 'next/navigation'

import { initialData } from '@/seed/seed'
import { titleFont } from '@/config/fonts'

const seedProducts = initialData.products

interface Props {
  params: {
    slug: string
  }
}

export default function ProductPage({ params }: Props) {
  const { slug } = params

  const product = seedProducts.find((product) => product.slug === slug)

  if (!product) {
    notFound()
  }

  return (
    <div className='mt-5 mb-20 grid md:grid-cols-3 gap-3'>
      {/* Slideshow */}
      <div className='md:col-span-2'>
        <h1>Hello</h1>
      </div>

      {/* Details */}
      <div className='px-5'>
        <h1 className={`${titleFont.className} antialiased font-bold text-xl`}>
          {product.title}
        </h1>
        <p className='text-lg mb-5'>${product.price}</p>

        {/* Sizes selector */}

        {/* Quantity selector */}

        {/* Button */}
        <button className='btn-primary my-5'>Add to cart</button>

        {/* Description */}
        <h3 className='font-bold text-sm'>Description</h3>
        <p className='font-light'>{product.description}</p>
      </div>
    </div>
  )
}
