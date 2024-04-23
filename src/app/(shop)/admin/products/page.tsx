export const revalidate = 0

import Link from 'next/link'
import {
  getPaginatedOrdersAdmin,
  getPaginatedProductsWithImages,
} from '@/actions'
import { Pagination, Title } from '@/components'

import { redirect } from 'next/navigation'
import { IoCardOutline } from 'react-icons/io5'
import Image from 'next/image'
import { currencyFormat } from '@/utils'

interface Props {
  searchParams: {
    page?: string
  }
}

export default async function OrderPage({ searchParams }: Props) {
  const page = searchParams.page ? parseInt(searchParams.page) : 1

  const { products, currentPage, totalPages } =
    await getPaginatedProductsWithImages({ page })

  return (
    <section className='flex min-h-[calc(100vh-56px-56px)] flex-col'>
      <Title title='Products maintenance' />

      <div className='mb-5 flex justify-end'>
        <Link href='/admin/product/new' className='btn-primary'>
          New Product
        </Link>
      </div>

      <div className='mb-10 grid grow'>
        <article className='overflow-x-auto'>
          <table className='min-w-full overflow-x-auto'>
            <thead className='border-b bg-gray-200'>
              <tr>
                <th
                  scope='col'
                  className='px-6 py-4 text-left text-sm font-medium text-gray-900'
                >
                  Image
                </th>
                <th
                  scope='col'
                  className='px-6 py-4 text-left text-sm font-medium text-gray-900'
                >
                  Title
                </th>
                <th
                  scope='col'
                  className='px-6 py-4 text-left text-sm font-medium text-gray-900'
                >
                  Price
                </th>
                <th
                  scope='col'
                  className='px-6 py-4 text-left text-sm font-medium text-gray-900'
                >
                  Gender
                </th>
                <th
                  scope='col'
                  className='px-6 py-4 text-left text-sm font-medium text-gray-900'
                >
                  Inventory
                </th>
                <th
                  scope='col'
                  className='px-6 py-4 text-left text-sm font-medium text-gray-900'
                >
                  Sizes
                </th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr
                  key={product.id}
                  className='border-b bg-white transition duration-300 ease-in-out hover:bg-gray-100'
                >
                  <td className='whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900'>
                    <Link href={`/product/${product.slug}`}>
                      <Image
                        src={`/products/${product.images[0]}`}
                        width={80}
                        height={80}
                        alt={product.title}
                        className='h-20 w-20 rounded object-cover'
                      />
                    </Link>
                  </td>
                  <td className='whitespace-nowrap px-6 py-4 text-sm font-light text-gray-900'>
                    <Link
                      href={`/admin/product/${product.slug}`}
                      className='hover:underline'
                    >
                      {product.title}
                    </Link>
                  </td>
                  <td className='whitespace-nowrap  px-6 py-4 text-sm font-bold text-gray-900'>
                    {currencyFormat(product.price)}
                  </td>
                  <td className='whitespace-nowrap  px-6 py-4 text-sm font-light text-gray-900'>
                    {product.gender}
                  </td>
                  <td className='whitespace-nowrap  px-6 py-4 text-sm font-bold text-gray-900'>
                    {product.inStock}
                  </td>
                  <td className='whitespace-nowrap  px-6 py-4 text-sm font-bold text-gray-900'>
                    {product.sizes.join(', ')}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </article>
      </div>
      {totalPages >= 2 && <Pagination totalPages={totalPages} />}
    </section>
  )
}
