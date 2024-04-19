import Link from 'next/link'
import { getPaginatedOrders } from '@/actions'
import { Pagination, Title } from '@/components'

import { redirect } from 'next/navigation'
import { IoCardOutline } from 'react-icons/io5'

interface Props {
  searchParams: {
    page?: string
  }
}

export default async function OrderPage({ searchParams }: Props) {
  const page = searchParams.page ? parseInt(searchParams.page) : 1

  const {
    ok,
    orders = [],
    userName = '',
    totalPages = 0,
  } = await getPaginatedOrders({ page, take: 10 })

  if (!ok) redirect('/auth/login')

  return (
    <section className='flex min-h-[calc(100vh-56px-56px)] flex-col'>
      <Title title='Orders' />
      <div className='mb-10 grid grow'>
        <article className='overflow-x-auto'>
          <table className='min-w-full overflow-x-auto'>
            <thead className='border-b bg-gray-200'>
              <tr>
                <th
                  scope='col'
                  className='px-6 py-4 text-left text-sm font-medium text-gray-900'
                >
                  # Id
                </th>
                <th
                  scope='col'
                  className='px-6 py-4 text-left text-sm font-medium text-gray-900'
                >
                  Name
                </th>
                <th
                  scope='col'
                  className='px-6 py-4 text-left text-sm font-medium text-gray-900'
                >
                  State
                </th>
                <th
                  scope='col'
                  className='px-6 py-4 text-left text-sm font-medium text-gray-900'
                >
                  Options
                </th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr
                  key={order.id}
                  className='border-b bg-white transition duration-300 ease-in-out hover:bg-gray-100'
                >
                  <td className='whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900'>
                    {order.id.split('-').at(-1)}
                  </td>
                  <td className='whitespace-nowrap px-6 py-4 text-sm font-light text-gray-900'>
                    {userName}
                  </td>
                  <td className='flex items-center whitespace-nowrap  px-6 py-4 text-sm font-light text-gray-900'>
                    {order.isPaid ? (
                      <>
                        <IoCardOutline className='text-green-800' />
                        <span className='mx-2 text-green-800'>Paid</span>
                      </>
                    ) : (
                      <>
                        <IoCardOutline className='text-red-800' />
                        <span className='mx-2 text-red-800'>Not paid</span>
                      </>
                    )}
                  </td>
                  <td className='px-6 text-sm font-light text-gray-900 '>
                    <Link
                      href={`/orders/${order.id}`}
                      className='hover:underline'
                    >
                      See order
                    </Link>
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
