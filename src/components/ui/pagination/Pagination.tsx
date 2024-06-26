'use client'

import { cn, generatePaginationNumbers } from '@/utils'
import Link from 'next/link'
import { redirect, usePathname, useSearchParams } from 'next/navigation'
import { IoChevronBackOutline, IoChevronForwardOutline } from 'react-icons/io5'

interface Props {
  totalPages: number
}

export const Pagination = ({ totalPages }: Props) => {
  const pathName = usePathname()
  const searchParams = useSearchParams()
  const searchString = searchParams.get('page') ?? 1

  const currentPage = +searchString

  if (currentPage < 1 || isNaN(+searchString)) {
    redirect(pathName)
  }

  const allPages = generatePaginationNumbers(currentPage, totalPages)

  const createPageUrl = (pageNumber: number | string) => {
    const params = new URLSearchParams(searchParams)

    if (pageNumber === '...') {
      return `${pathName}?${params.toString()}`
    }

    if (+pageNumber <= 0) {
      return `${pathName}?${params.toString()}`
    }

    if (+pageNumber > totalPages) {
      return `${pathName}?${params.toString()}`
    }

    params.set('page', pageNumber.toString())
    return `${pathName}?${params.toString()}`
  }

  return (
    <div className='mb-32 mt-10 flex justify-center'>
      <nav aria-label='navigation example'>
        <ul className='list-style-none flex'>
          <li className='page-item'>
            <Link
              className='page-link relative block rounded border-0 bg-transparent px-3 py-1.5 text-gray-800 outline-none transition-all duration-300 hover:bg-gray-200 hover:text-gray-800 focus:shadow-none'
              href={createPageUrl(currentPage - 1)}
              aria-label='Back'
            >
              <IoChevronBackOutline size={30} />
            </Link>
          </li>
          {allPages.map((page, index) => (
            <li key={page + '-' + index} className='page-item'>
              <Link
                className={cn(
                  'page-link relative block rounded border-0 bg-transparent px-3 py-1.5 text-gray-800 outline-none transition-all duration-300 hover:bg-gray-200 hover:text-gray-800',
                  {
                    'bg-blue-600 text-white shadow-md hover:bg-blue-500 hover:text-white focus:shadow-md ':
                      page === currentPage,
                  }
                )}
                href={createPageUrl(page)}
              >
                {page}
              </Link>
            </li>
          ))}
          <li className='page-item'>
            <Link
              className='page-link relative block rounded border-0 bg-transparent px-3 py-1.5 text-gray-800 outline-none transition-all duration-300 hover:bg-gray-200 hover:text-gray-800 focus:shadow-none'
              href={createPageUrl(currentPage + 1)}
              aria-label='Next'
            >
              <IoChevronForwardOutline size={30} />
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  )
}
