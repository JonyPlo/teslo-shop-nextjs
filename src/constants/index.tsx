import { SideBarItems } from '@/interfaces'
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
    path: '/',
    text: 'Profile',
    icon: <IoPersonOutline size={30} />,
  },
  {
    path: '/',
    text: 'Orders',
    icon: <IoTicketOutline size={30} />,
  },
  {
    path: '/',
    text: 'Log In',
    icon: <IoLogInOutline size={30} />,
  },
  {
    path: '/',
    text: 'Log Out',
    icon: <IoLogOutOutline size={30} />,
  },
]

export const administrationItems: SideBarItems[] = [
  {
    path: '/',
    text: 'Products',
    icon: <IoShirtOutline size={30} />,
  },

  {
    path: '/',
    text: 'Orders',
    icon: <IoTicketOutline size={30} />,
  },
  {
    path: '/',
    text: 'Users',
    icon: <IoPeopleOutline size={30} />,
  },
]
