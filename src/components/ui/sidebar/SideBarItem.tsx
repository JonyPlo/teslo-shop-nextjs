import type { SideBarItems } from '@/interfaces'
import Link from 'next/link'

interface Props {
  item: SideBarItems
  isAuthenticated: boolean
  closeMenu: () => void
}

export const SideBarItem = ({ item, isAuthenticated, closeMenu }: Props) => {
  // Si el usuario esta autenticado, entonces convierto el isAuthenticated en false para que retorne null en lugar del boton 'Log In'
  if (!isAuthenticated && item.text === 'Log In') return null

  return (
    <Link
      href={item.path}
      className='mt-6 flex items-center rounded p-2 transition-all hover:bg-gray-100'
      onClick={closeMenu}
    >
      {item.icon}
      <span className='ml-3 text-xl'>{item.text}</span>
    </Link>
  )
}
