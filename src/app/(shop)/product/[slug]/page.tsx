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
      url: 'http://localhost:3000',
      siteName: 'Teslo Shop',
      // En la propiedad image tomamos una imagen basada en el producto que obtenemos actualmente y queremos obtener esa imagen, en este caso de carpeta public para que esa imagen se muestre cuando compartimos la url a alguien, es decir, si copiamos el link de un producto, entonces cuando le mandemos el link a alguien la otra persona recibirá el enlace junto a una imagen del producto que le queremos mostrar.
      // Tener en cuenta que normalmente en esta propiedad se agrega la url de la imagen subida en la nube, y no desde mi proyecto ya que se recomienda que las imagenes esten subidas en otro lado aparte al proyecto
      images: [
        {
          url: `/products/${product?.images[1]}`, // Tiene que ser una ruta absoluta
          width: 800, // Opcional
          height: 600, // Opcional
          alt: product?.title, // Opcional
        },
      ],
      // Forma resumida sin opciones
      // images: [`/products/${product?.images[1]}`],
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
        {/* Sizes selector */}
        <SizeSelector
          selectedSize={product.sizes[0]}
          availableSizes={product.sizes}
        />
        {/* Quantity selector */}
        <QuantitySelector quantity={2} />
        {/* Button */}
        <AddToCartButton />
        {/* Description */}
        <h3 className='text-sm font-bold'>Description</h3>
        <p className='font-light'>{product.description}</p>
      </div>
    </div>
  )
}
