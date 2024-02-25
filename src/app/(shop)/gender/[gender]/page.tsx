import { ProductGrid, Title } from '@/components'
import { Category } from '@/interfaces'
import { initialData } from '@/seed/seed'
import { notFound } from 'next/navigation'

const seedProducts = initialData.products

interface Props {
  params: {
    id: Category
  }
}

export default function CategoryPage({ params }: Props) {
  const { id } = params

  const products = seedProducts.filter((product) => product.gender === id)

  // if (id === 'kids') {
  //   notFound()
  // }

  // Record es un tipo nativo de typescript, y en este caso usamos Record<ValidCategories, string> que es lo mismo que {[key: string]: string}, se suele usar el Record porque es mas fácil de leer
  const labels: Record<Category, string> = {
    men: 'Men',
    women: 'Women',
    kid: 'Kids',
    unisex: 'everyone',
  }

  return (
    <div>
      <Title
        title={`Products for ${labels[id]}`}
        subtitle='All products'
        className='mb-2'
      />
      <ProductGrid products={products} />
    </div>
  )
}
