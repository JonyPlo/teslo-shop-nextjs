export const revalidate = 60

import { getPaginatedProductsWithImages } from '@/actions'
import { Pagination, ProductGrid, Title } from '@/components'
import { LABELS } from '@/constants'
import type { Gender } from '@/interfaces'
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

  return (
    <div className='flex min-h-[calc(100vh-56px-56px)] flex-col'>
      <Title
        title={`Products for ${LABELS[gender]}`}
        subtitle='All products'
        className='mb-2'
      />
      <ProductGrid products={products} />
      {totalPages >= 2 && <Pagination totalPages={totalPages} />}
    </div>
  )
}
