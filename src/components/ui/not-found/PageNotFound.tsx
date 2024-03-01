import { titleFont } from '@/config/fonts'
import Image from 'next/image'
import Link from 'next/link'

export const PageNotFound = () => {
  return (
    <div className='flex min-h-[calc(100vh-56px-56px)] flex-col-reverse items-center justify-center md:flex-row'>
      <div className='mx-5 px-5 text-center'>
        <h2 className={`${titleFont.className} text-9xl antialiased`}>404</h2>
        <p className='text-xl font-semibold'>
          The page you are looking for does not exist
        </p>
        <p className='font-light'>
          <span>Return to </span>
          <Link href='/' className='font-normal transition-all hover:underline'>
            Home
          </Link>
        </p>
      </div>
      <div className='mx-5 px-5'>
        <Image
          src='/imgs/starman_750x750.png'
          alt='Starman'
          className='p-5 sm:p-0'
          width={550}
          height={550}
        />
      </div>
    </div>
  )
}
