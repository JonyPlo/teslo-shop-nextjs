export const revalidate = 60

import { getPaginatedProductsWithImages } from '@/actions'
import { Pagination, ProductGrid, Title } from '@/components'
import { Gender } from '@/interfaces'
import { redirect } from 'next/navigation'

interface Props {
  params: {
    gender: Gender
  }
  searchParams: {
    page?: string
  }
}

export default async function CategoryPage({ params, searchParams }: Props) {
  const { gender } = params
  const page = searchParams.page ? Number(searchParams.page) : 1

  const { products, totalPages } = await getPaginatedProductsWithImages({
    page,
    gender,
  })

  if (products.length === 0) {
    redirect(`/gender/${gender}`)
  }

  // Record es un tipo nativo de typescript, y en este caso usamos Record<ValidCategories, string> que es lo mismo que {[key: string]: string}, se suele usar el Record porque es mas fácil de leer
  const labels: Record<Gender, string> = {
    men: 'Men',
    women: 'Women',
    kid: 'Kids',
    unisex: 'everyone',
  }

  return (
    <div className='flex flex-col min-h-[calc(100vh-56px-56px)]'>
      <Title
        title={`Products for ${labels[gender]}`}
        subtitle='All products'
        className='mb-2'
      />
      <ProductGrid products={products} />
      {totalPages >= 2 && <Pagination totalPages={totalPages} />}
    </div>
  )
}
