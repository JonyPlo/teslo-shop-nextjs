import { SideBarItems } from '@/interfaces'
import Link from 'next/link'

interface Props {
  item: SideBarItems
}

export const SideBarItem = ({ item }: Props) => {
  return (
    <Link
      href={item.path}
      className='flex items-center mt-6 p-2 hover:bg-gray-100 rounded transition-all'
    >
      {item.icon}
      <span className='ml-3 text-xl'>{item.text}</span>
    </Link>
  )
}
