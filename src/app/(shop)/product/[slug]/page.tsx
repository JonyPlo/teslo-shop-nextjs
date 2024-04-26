export const revalidate = 604800

import { Metadata, ResolvingMetadata } from 'next'
import { notFound, redirect } from 'next/navigation'

import { titleFont } from '@/config/fonts'
import {
  ProductMobileSlideshow,
  ProductSlideshow,
  StockLabel,
} from '@/components'
import { getProductBySlug } from '@/actions'
import { AddToCart } from './ui/AddToCart'

interface Props {
  params: {
    slug: string
  }
}

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const slug = params.slug
  const product = await getProductBySlug(slug)

  // optionally access and extend (rather than replace) parent metadata
  // const previousImages = (await parent).openGraph?.images || []

  return {
    metadataBase: new URL('https://teslo-shop-jp.vercel.app/'),
    title: product?.title ?? 'Product not found',
    description: product?.description ?? '',
    openGraph: {
      title: product?.title ?? 'Product not found',
      description: product?.description ?? '',
      url: 'https://teslo-shop-jp.vercel.app/',
      siteName: 'Teslo Shop',

      images: [
        {
          url: product?.images[1].startsWith('https')
            ? product?.images[1]
            : `/products/${product?.images[1]}`,
          width: 800, // Opcional
          height: 600, // Opcional
          alt: product?.title, // Opcional
        },
      ],

      type: 'website',
    },
  }
}

export default async function ProductPage({ params }: Props) {
  const { slug } = params
  const product = await getProductBySlug(slug)

  if (!product) {
    notFound()
  }

  if (product.images.length === 0) redirect('/')

  return (
    <div className='mb-20 mt-5 grid gap-3 md:grid-cols-3'>
      {/* Slideshow */}
      <div className='md:col-span-2'>
        {/* Desktop Slideshow */}
        <ProductSlideshow
          title={product.title}
          images={product.images}
          className='hidden md:block'
        />
        {/* Mobile Slideshow */}
        <ProductMobileSlideshow
          title={product.title}
          images={product.images}
          className='block md:hidden'
        />
      </div>
      {/* Details */}
      <div className='px-5'>
        <StockLabel slug={product.slug} />
        <h1 className={`${titleFont.className} text-xl font-bold antialiased`}>
          {product.title}
        </h1>
        <p className='mb-5 text-lg'>${product.price}</p>
        <AddToCart product={product} />
        {/* Description */}
        <h3 className='text-sm font-bold'>Description</h3>
        <p className='font-light'>{product.description}</p>
      </div>
    </div>
  )
}
