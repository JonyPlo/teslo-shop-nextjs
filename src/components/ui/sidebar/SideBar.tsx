'use client'

import { IoCloseOutline, IoSearchOutline } from 'react-icons/io5'
import { SideBarItem } from './SideBarItem'
import { useUiStore } from '@/store'
import clsx from 'clsx'
import { administrationItems, userItems } from '@/constants'

export const SideBar = () => {
  const isSideMenuOpen = useUiStore((state) => state.isSideMenuOpen)
  const closeMenu = useUiStore((state) => state.closeSideMenu)

  return (
    <div>
      {/* Background black */}
      {isSideMenuOpen && (
        <div className='fixed top-0 left-0 w-screen h-screen z-10 bg-black opacity-30' />
      )}
      {/* Blur */}
      {isSideMenuOpen && (
        <div
          onClick={closeMenu}
          className='fade-in fixed top-0 left-0 w-screen h-screen z-10 backdrop-filter backdrop-blur-sm'
        />
      )}
      {/* Side Menu */}
      <nav
        className={
          // Con la libreria 'clsx' podemos crear estilos condicionales
          clsx(
            // Ingresamos dentro de los parentesis las clases que se aplicaran siempre a la etiqueta
            'fixed p-5 right-0 top-0 w-screen md:w-[500px] h-screen bg-white z-20 shadow-2xl transform transition-all duration-300',
            // Despues de las clases ponemos una coma y dentro de un objeto definimos la clase que se agregara si se cumple una cierta condicion, en este casi decimos que se agregara la clase 'translate-x-full' siempre y cuando el state 'isSideMenuOpen' sea true
            {
              'translate-x-full': !isSideMenuOpen,
            }
          )
        }
      >
        <IoCloseOutline
          size={50}
          className='absolute top-5 right-5 cursor-pointer'
          onClick={closeMenu}
        />
        {/* Input */}
        <div className='relative mt-14'>
          <IoSearchOutline size={20} className='absolute top-2 left-2' />
          <input
            type='text'
            placeholder='Search'
            className='w-full bg-gray-50 rounded pl-10 py-1 pr-10 border-b-2 text-xl border-gray-200 focus:outline-none focus:border-blue-500'
          />
        </div>
        {/* User Menu */}
        {userItems.map((item) => (
          <SideBarItem key={item.path} item={item} />
        ))}
        {/* Line Separator */}
        <div className='w-full h-px bg-gray-200 my-10 rounded' />
        {/* Administration Menu */}
        {administrationItems.map((item) => (
          <SideBarItem key={item.path} item={item} />
        ))}
      </nav>
    </div>
  )
}
