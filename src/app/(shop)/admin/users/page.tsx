export const revalidate = 0

import { getPaginatedUsers } from '@/actions'
import { Pagination, Title } from '@/components'

import { redirect } from 'next/navigation'
import { UserTable } from './ui/UserTable'

interface Props {
  searchParams: {
    page?: string
  }
}

export default async function OrderPage({ searchParams }: Props) {
  const page = searchParams.page ? parseInt(searchParams.page) : 1

  const {
    ok,
    totalPages = 0,
    users = [],
  } = await getPaginatedUsers({ page, take: 12 })

  if (!ok) redirect('/auth/login')

  return (
    <section className='flex min-h-[calc(100vh-56px-56px)] flex-col'>
      <Title title='User maintenance' />
      <div className='mb-10 grid grow'>
        <article className='overflow-x-auto'>
          <UserTable users={users} />
        </article>
      </div>
      {totalPages >= 2 && <Pagination totalPages={totalPages} />}
    </section>
  )
}
