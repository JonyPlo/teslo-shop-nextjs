'use client'

import {
  IoCloseOutline,
  IoLogOutOutline,
  IoSearchOutline,
} from 'react-icons/io5'
import { SideBarItem } from './SideBarItem'
import { useUiBoundStore } from '@/store'
import { useSession } from 'next-auth/react'
import { cn } from '@/utils'
import { logout } from '@/actions'
import {
  USER_ROLE,
  adminOptions,
  userOptions,
} from './constants/sidebar.constants'

export const SideBar = () => {
  const isSideMenuOpen = useUiBoundStore((state) => state.isSideMenuOpen)
  const closeMenu = useUiBoundStore((state) => state.setIsSideMenuOpen)

  // El hook useSession es un metodo que nos devuelve la informacion de la persona que esta autenticada actualmente, es un hook que se puede usar del 'lado del cliente' en vez de usar el metodo 'auth()' desde el archivo 'auth.config.ts' que se usa en los componentes del lado del servidor
  //! IMPORTANTE: Para que este hook funcione el componente debe estar envuelto por un HOC llamado '<SessionProvider />' de lo contrario nos dara error, asi que para eso vamos a crear un componente '<Provider />' que tendra el SessionProvider y usarlo en el punto mas alto de la aplicacion, en el componente Provider explico con mas detalles sobre como usarlo
  const { data: session } = useSession()
  const isAuthenticated = Boolean(session?.user)
  const isAdmin = session?.user.role === USER_ROLE.ADMIN

  const onLogout = async () => {
    // Limpiamos el local storage por si se loguea otra persona en el mismo PC, no le aparezca el carrito de compras ni la direccion del usuario anterior
    localStorage.clear()

    // Server Action
    await logout()
  }

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
          className='fixed left-0 top-0 z-10 h-screen w-screen backdrop-blur-sm backdrop-filter fade-in'
        />
      )}

      {/* Side Menu */}
      <nav
        className={cn(
          'fixed right-0 top-0 z-20 h-screen w-screen transform bg-white p-5 shadow-2xl transition-all duration-300 md:w-[500px]',
          {
            'translate-x-full': !isSideMenuOpen,
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
        {userOptions.map((item) => (
          <SideBarItem
            key={item.path}
            item={item}
            isAuthenticated={isAuthenticated}
            closeMenu={closeMenu}
          />
        ))}

        {/* Logout button */}
        {isAuthenticated && (
          <button
            className='mt-6 flex w-full items-center rounded p-2 transition-all hover:bg-gray-100'
            onClick={onLogout}
          >
            <IoLogOutOutline size={30} />
            <span className='ml-3 text-xl'>Log Out</span>
          </button>
        )}

        {/* If role is 'admin', show admin options */}
        {isAdmin && (
          <>
            {/* Line Separator */}
            <div className='my-10 h-px w-full rounded bg-gray-200' />

            {/* Admin Menu */}
            {adminOptions.map((item) => (
              <SideBarItem
                key={item.path}
                item={item}
                isAuthenticated={isAuthenticated}
                closeMenu={closeMenu}
              />
            ))}
          </>
        )}
      </nav>
    </div>
  )
}
