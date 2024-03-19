'use client'

import { IoCloseOutline, IoSearchOutline } from 'react-icons/io5'
import { SideBarItem } from './SideBarItem'
import { useUiBoundStore } from '@/store'
import { administrationItems, userItems } from '@/constants'
import { cn } from '@/utils'

export const SideBar = () => {
  const isSideMenuOpen = useUiBoundStore((state) => state.isSideMenuOpen)
  const closeMenu = useUiBoundStore((state) => state.setIsSideMenuOpen)

  return (
    <div>
      {/* Background black */}
      {isSideMenuOpen && (
        <div className='fixed left-0 top-0 z-10 h-screen w-screen bg-black opacity-30' />
      )}
      {/* Blur */}
      {isSideMenuOpen && (
        <div
          onClick={closeMenu}
          className='fade-in fixed left-0 top-0 z-10 h-screen w-screen backdrop-blur-sm backdrop-filter'
        />
      )}
      {/* Side Menu */}
      <nav
        className={cn(
          'fixed right-0 top-0 z-20 h-screen w-screen transform bg-white p-5 shadow-2xl transition-all duration-300 md:w-[500px]',
          {
            'translate-x-full': isSideMenuOpen === true,
          }
        )}
      >
        <IoCloseOutline
          size={50}
          className='absolute right-5 top-5 cursor-pointer'
          onClick={closeMenu}
        />
        {/* Input */}
        <div className='relative mt-14'>
          <IoSearchOutline size={20} className='absolute left-2 top-2' />
          <input
            type='text'
            placeholder='Search'
            className='w-full rounded border-b-2 border-gray-200 bg-gray-50 py-1 pl-10 pr-10 text-xl focus:border-blue-500 focus:outline-none'
          />
        </div>
        {/* User Menu */}
        {userItems.map((item) => (
          <SideBarItem key={item.path} item={item} />
        ))}
        {/* Line Separator */}
        <div className='my-10 h-px w-full rounded bg-gray-200' />
        {/* Administration Menu */}
        {administrationItems.map((item) => (
          <SideBarItem key={item.path} item={item} />
        ))}
      </nav>
    </div>
  )
}
