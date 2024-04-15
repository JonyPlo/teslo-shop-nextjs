import { getOrdersBySessionUser } from '@/actions'
import { Title } from '@/components'

import Link from 'next/link'
import { redirect } from 'next/navigation'
import { IoCardOutline } from 'react-icons/io5'

export default async function OrderPage() {
  const { ok, orders = [], userName = '' } = await getOrdersBySessionUser()

  if (!ok) redirect('/auth/login')

  return (
    <>
      <Title title='Orders' />
      <div className='mb-10'>
        <table className='min-w-full'>
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
      </div>
    </>
  )
}
