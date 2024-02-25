'use client'

import { titleFont } from '@/config/fonts'
import { useUiStore } from '@/store'
import Link from 'next/link'
import React from 'react'
import { IoCartOutline, IoSearchOutline } from 'react-icons/io5'

export const TopMenu = () => {
  const openMenu = useUiStore((state) => state.openSideMenu)

  return (
    <nav className='flex px-5 justify-between items-center w-full'>
      {/* Logo */}
      <div>
        <Link href={'/'}>
          {/* De esta forma aplicamos una fuente diferente a una etiqueta, esta fuente aplica tambien para todas la etiquetas que esten dentro de ella */}
          <span className={`${titleFont.className} antialiased font-bold`}>
            Teslo
          </span>
          <span> | Shop</span>
        </Link>
      </div>

      {/* Center Menu */}
      <div className='hidden sm:block'>
        <Link
          className='m-2 p-2 rounded-md transition-all hover:bg-gray-100'
          href={'/gender/men'}
        >
          Men
        </Link>
        <Link
          className='m-2 p-2 rounded-md transition-all hover:bg-gray-100'
          href={'/gender/women'}
        >
          Women
        </Link>
        <Link
          className='m-2 p-2 rounded-md transition-all hover:bg-gray-100'
          href={'/gender/kid'}
        >
          Kids
        </Link>
      </div>

      {/* Search, Cart and Menu icons */}
      <div className='flex items-center'>
        <Link href={'/search'} className='mx-2'>
          <IoSearchOutline className='w-5 h-5' />
        </Link>
        <Link href={'/cart'} className='mx-2'>
          <div className='relative'>
            <span className='absolute text-xs px-1 rounded-full font-bold -top-2 -right-2 bg-blue-700 text-white'>
              3
            </span>
            <IoCartOutline className='w-5 h-5' />
          </div>
        </Link>
        <button
          onClick={openMenu}
          className='m-2 p-2 rounded-md transition-all hover:bg-gray-100'
        >
          Menu
        </button>
      </div>
    </nav>
  )
}
