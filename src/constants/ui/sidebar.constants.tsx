import type { SideBarItems } from '@/interfaces'
import {
  IoLogInOutline,
  IoPeopleOutline,
  IoPersonOutline,
  IoShirtOutline,
  IoTicketOutline,
} from 'react-icons/io5'

export const userOptions: SideBarItems[] = [
  {
    path: '/profile',
    text: 'Profile',
    icon: <IoPersonOutline size={30} />,
  },
  {
    path: '/orders',
    text: 'Orders',
    icon: <IoTicketOutline size={30} />,
  },
  {
    path: '/auth/login',
    text: 'Log In',
    icon: <IoLogInOutline size={30} />,
  },
]

export const adminOptions: SideBarItems[] = [
  {
    path: '/products',
    text: 'Products',
    icon: <IoShirtOutline size={30} />,
  },

  {
    path: '/orders',
    text: 'Orders',
    icon: <IoTicketOutline size={30} />,
  },
  {
    path: '/users',
    text: 'Users',
    icon: <IoPeopleOutline size={30} />,
  },
]
