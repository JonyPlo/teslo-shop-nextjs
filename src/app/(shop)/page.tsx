// Con export const revalidate = 60 estoy diciendo que la pagina con los productos se revalidara cada 60 segundos, es decir, la informacion permanecerá en cache por 60 segundos y una vez pasado ese tiempo, si se vuelve a este componente se realizara la peticion correspondiente para volver a cargar todo
export const revalidate = 60

import { getPaginatedProductsWithImages } from '@/actions'
import { Pagination, ProductGrid, Title } from '@/components'
import { redirect } from 'next/navigation'

interface Props {
  searchParams: {
    page?: string
  }
}

export default async function Home({ searchParams }: Props) {
  const page = searchParams.page ? parseInt(searchParams.page) : 1

  const { products, currentPage, totalPages } =
    await getPaginatedProductsWithImages({ page })

  if (products.length === 0) {
    redirect('/')
  }

  return (
    <>
      <Title title='Shop' subtitle='All products' className='mb-2' />
      <ProductGrid products={products} />
      <Pagination totalPages={totalPages} />
    </>
  )
}
