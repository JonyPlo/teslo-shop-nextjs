import type { Product } from '@/interfaces'
import { ProductGridItem } from './ProductGridItem'

interface Props {
  products: Product[]
}

export const ProductGrid = ({ products }: Props) => {
  return (
    <div className='mb-10 grid grow grid-cols-1 gap-10 sm:grid-cols-2 md:grid-cols-3'>
      {products.map((product) => (
        <ProductGridItem key={product.slug} product={product} />
      ))}
    </div>
  )
}
