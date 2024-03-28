import type { SideBarItems } from '@/interfaces'
import Link from 'next/link'

interface Props {
  item: SideBarItems
  closeMenu: () => void
}

export const SideBarItem = ({ item, closeMenu }: Props) => {
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
