import type { SideBarItems } from '@/interfaces'
import {
  IoLogInOutline,
  IoLogOutOutline,
  IoPeopleOutline,
  IoPersonOutline,
  IoShirtOutline,
  IoTicketOutline,
} from 'react-icons/io5'

export const userItems: SideBarItems[] = [
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
    path: '/login',
    text: 'Log In',
    icon: <IoLogInOutline size={30} />,
  },
  {
    path: '/logout',
    text: 'Log Out',
    icon: <IoLogOutOutline size={30} />,
  },
]

export const administrationItems: SideBarItems[] = [
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
