import Link from 'next/link'
import { IoCartOutline } from 'react-icons/io5'

export default function EmptyPage() {
  return (
    <div className='flex h-screen items-center justify-center'>
      <IoCartOutline size={80} className='mr-5' />
      <div className='flex flex-col items-center'>
        <h1 className='text-xl font-semibold'>Your cart is empty</h1>
        <Link
          href={'/'}
          className='mt-2 text-4xl text-blue-500 hover:underline'
        >
          Return
        </Link>
      </div>
    </div>
  )
}
