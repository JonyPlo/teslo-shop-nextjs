import { titleFont } from '@/config/fonts'
import Link from 'next/link'

export const Footer = () => {
  return (
    <div className='mb-10 flex w-full justify-center text-xs'>
      <Link href={'/'} className='mx-3'>
        <span className={`${titleFont.className} font-bold antialiased`}>
          Teslo
        </span>
        <span> | Shop </span>
        <span>&copy; {new Date().getFullYear()}</span>
      </Link>
      <Link href={'/'} className='mx-3'>
        Privacy & Legal
      </Link>
      <Link href={'/'} className='mx-3'>
        Locations
      </Link>
    </div>
  )
}
