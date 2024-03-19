'use client'

import { generatePaginationNumbers } from '@/utils'
import clsx from 'clsx'
import Link from 'next/link'
import { redirect, usePathname, useSearchParams } from 'next/navigation'
import { IoChevronBackOutline, IoChevronForwardOutline } from 'react-icons/io5'
import { twMerge } from 'tailwind-merge'

interface Props {
  totalPages: number
}

export const Pagination = ({ totalPages }: Props) => {
  const pathName = usePathname()
  const searchParams = useSearchParams()
  const searchString = searchParams.get('page') ?? 1

  // Validacion para parametros que sean letras '/?page=abc'
  const currentPage = +searchString

  // Validacion para parametros que sean numeros negativos '/?page=-3'
  if (currentPage < 1 || isNaN(+searchString)) {
    redirect(pathName)
  }

  const allPages = generatePaginationNumbers(currentPage, totalPages)

  const createPageUrl = (pageNumber: number | string) => {
    const params = new URLSearchParams(searchParams)

    // Este if simplemente devuelve el mismo url en el cual ya me encuentro por ejemplo '/?page=1'
    if (pageNumber === '...') {
      return `${pathName}?${params.toString()}`
    }
    // Si el numero es igual a 0 en este caso el url sera '/'
    if (+pageNumber <= 0) {
      return `${pathName}?${params.toString()}`
    }

    // Si la pagina es mayor al total de paginas entonces la url sera igual al url actual por ej '/?page=1'
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
            >
              <IoChevronBackOutline size={30} />
            </Link>
          </li>
          {allPages.map((page, index) => (
            <li key={page + '-' + index} className='page-item'>
              <Link
                className={twMerge(
                  // Base styles
                  'page-link relative block rounded border-0 bg-transparent px-3 py-1.5 text-gray-800 outline-none transition-all duration-300 hover:bg-gray-200 hover:text-gray-800',

                  // Current page styles
                  page === currentPage &&
                    'bg-blue-600 text-white shadow-md hover:bg-blue-500 hover:text-white focus:shadow-md '
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
            >
              <IoChevronForwardOutline size={30} />
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  )
}
