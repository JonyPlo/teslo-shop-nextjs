import { getPaginatedProductsWithImages } from '@/actions'
import { ProductGrid, Title } from '@/components'

export default async function Home() {
  const { products } = await getPaginatedProductsWithImages()
  console.log(products)

  return (
    <>
      <Title title='Shop' subtitle='All products' className='mb-2' />
      <ProductGrid products={products} />
    </>
  )
}
