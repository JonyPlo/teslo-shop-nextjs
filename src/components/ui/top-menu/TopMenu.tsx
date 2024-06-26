'use client'

import { titleFont } from '@/config/fonts'
import { useCartBoundStore, useUiBoundStore } from '@/store'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { IoCartOutline, IoSearchOutline } from 'react-icons/io5'

export const TopMenu = () => {
  const { setIsSideMenuOpen: openMenu } = useUiBoundStore()
  const totalItemsInCart = useCartBoundStore((state) => state.getTotalItems())

  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    setLoaded(true)
  }, [])

  const cartBadge = loaded && totalItemsInCart > 0 && (
    <span className='absolute -right-2 -top-2 rounded-full bg-blue-700 px-1 text-xs font-bold text-white fade-in'>
      {totalItemsInCart}
    </span>
  )

  return (
    <nav className='flex w-full items-center justify-between px-5'>
      {/* Logo */}
      <div>
        <Link href={'/'}>
          <span className={`${titleFont.className} font-bold antialiased`}>
            Teslo
          </span>
          <span> | Shop</span>
        </Link>
      </div>

      {/* Center Menu */}
      <div className='hidden sm:block'>
        <Link
          className='m-2 rounded-md p-2 transition-all hover:bg-gray-100'
          href={'/gender/men'}
        >
          Men
        </Link>
        <Link
          className='m-2 rounded-md p-2 transition-all hover:bg-gray-100'
          href={'/gender/women'}
        >
          Women
        </Link>
        <Link
          className='m-2 rounded-md p-2 transition-all hover:bg-gray-100'
          href={'/gender/kid'}
        >
          Kids
        </Link>
      </div>

      {/* Search, Cart and Menu icons */}
      <div className='flex items-center'>
        <Link href={'/search'} className='mx-2' aria-label='Search'>
          <IoSearchOutline className='h-5 w-5' />
        </Link>
        <Link
          href={loaded && totalItemsInCart === 0 ? '/empty' : '/cart'}
          className='mx-2'
          aria-label='Cart'
        >
          <div className='relative'>
            {cartBadge}
            <IoCartOutline className='h-5 w-5 ' />
          </div>
        </Link>
        <button
          onClick={openMenu}
          className='m-2 rounded-md p-2 transition-all hover:bg-gray-100'
        >
          Menu
        </button>
      </div>
    </nav>
  )
}
