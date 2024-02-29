export const revalidate = 604800 // 7 dias

import { Metadata, ResolvingMetadata } from 'next'
import { notFound } from 'next/navigation'

import { titleFont } from '@/config/fonts'
import {
  AddToCartButton,
  ProductMobileSlideshow,
  ProductSlideshow,
  QuantitySelector,
  SizeSelector,
  StockLabel,
} from '@/components'
import { getProductBySlug } from '@/actions'

interface Props {
  params: {
    slug: string
  }
}

// De esta forma se crea una Metadata Dinámica, la cual toma datos de la URL para usarlos como metadatos
export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  // read route params
  const slug = params.slug
 
  // obtengo el producto basado en el slug de la url
  const product = await getProductBySlug(slug)
 
  // optionally access and extend (rather than replace) parent metadata
  // const previousImages = (await parent).openGraph?.images || []
 
  return {
    title: product?.title ?? 'Product not found',
    description: product?.description ?? '',
    openGraph: {
      title: product?.title ?? 'Product not found',
      description: product?.description ?? '',
      // En la propiedad image tomamos una imagen de la carpeta public
      images: [`/products/${product?.images[1]}`],
    },
  }
}
 

export default async function ProductPage({ params }: Props) {
  const { slug } = params
  const product = await getProductBySlug(slug)

  if (!product) {
    notFound()
  }

  return (
    <div className='mt-5 mb-20 grid md:grid-cols-3 gap-3'>
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
        <h1 className={`${titleFont.className} antialiased font-bold text-xl`}>
          {product.title}
        </h1>
        <p className='text-lg mb-5'>${product.price}</p>
        {/* Sizes selector */}
        <SizeSelector
          selectedSize={product.sizes[0]}
          availableSizes={product.sizes}
        />
        {/* Quantity selector */}
        <QuantitySelector quantity={2} />
        {/* Button */}
        <AddToCartButton slug={product.slug} />
        {/* Description */}
        <h3 className='font-bold text-sm'>Description</h3>
        <p className='font-light'>{product.description}</p>
      </div>
    </div>
  )
}
