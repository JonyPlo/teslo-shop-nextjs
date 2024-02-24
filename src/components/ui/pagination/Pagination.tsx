'use client'

import Link from 'next/link'
import { usePathname, useSearchParams } from 'next/navigation'
import { IoChevronBackOutline, IoChevronForwardOutline } from 'react-icons/io5'

interface Props {
  totalPages: number
}

export const Pagination = ({ totalPages }: Props) => {
  const pathName = usePathname()
  const searchParams = useSearchParams()
  const currentPage = Number(searchParams.get('page')) ?? 1

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
    <div className='text-center flex justify-center mt-10 mb-32'>
      <nav aria-label='Page navigation example'>
        <ul className='flex list-style-none'>
          <li className='page-item'>
            <Link
              className='page-link relative block py-1.5 px-3 border-0 bg-transparent outline-none transition-all duration-300 rounded text-gray-800 hover:text-gray-800 hover:bg-gray-200 focus:shadow-none'
              href={createPageUrl(currentPage - 1)}
            >
              <IoChevronBackOutline size={30} />
            </Link>
          </li>
          <li className='page-item'>
            <a
              className='page-link relative block py-1.5 px-3 border-0 bg-transparent outline-none transition-all duration-300 rounded text-gray-800 hover:text-gray-800 hover:bg-gray-200 focus:shadow-none'
              href='#'
            >
              1
            </a>
          </li>
          <li className='page-item active'>
            <a
              className='page-link relative block py-1.5 px-3 border-0 bg-blue-600 outline-none transition-all duration-300 rounded text-white hover:text-white hover:bg-blue-600 shadow-md focus:shadow-md'
              href='#'
            >
              2 <span className='visually-hidden'></span>
            </a>
          </li>
          <li className='page-item'>
            <a
              className='page-link relative block py-1.5 px-3 border-0 bg-transparent outline-none transition-all duration-300 rounded text-gray-800 hover:text-gray-800 hover:bg-gray-200 focus:shadow-none'
              href='#'
            >
              3
            </a>
          </li>
          <li className='page-item'>
            <a
              className='page-link relative block py-1.5 px-3 border-0 bg-transparent outline-none transition-all duration-300 rounded text-gray-800 hover:text-gray-800 hover:bg-gray-200 focus:shadow-none'
              href='#'
            >
              ...
            </a>
          </li>
          <li className='page-item'>
            <Link
              className='page-link relative block py-1.5 px-3 border-0 bg-transparent outline-none transition-all duration-300 rounded text-gray-800 hover:text-gray-800 hover:bg-gray-200 focus:shadow-none'
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
