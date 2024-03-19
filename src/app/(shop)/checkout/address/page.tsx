import { Title } from '@/components'
import Link from 'next/link'

export default function AddressPage() {
  return (
    <div className='mb-72 flex flex-col px-10 sm:items-center sm:justify-center sm:px-0'>
      <div className='flex  w-full flex-col justify-center text-left xl:w-[1000px]'>
        <Title title='Address' subtitle='Delivery Address' />
        <div className='grid grid-cols-1 gap-2 sm:grid-cols-2 sm:gap-5'>
          <div className='mb-2 flex flex-col'>
            <span>Name</span>
            <input type='text' className='rounded-md border bg-gray-200 p-2' />
          </div>
          <div className='mb-2 flex flex-col'>
            <span>Surname</span>
            <input type='text' className='rounded-md border bg-gray-200 p-2' />
          </div>
          <div className='mb-2 flex flex-col'>
            <span>Address</span>
            <input type='text' className='rounded-md border bg-gray-200 p-2' />
          </div>
          <div className='mb-2 flex flex-col'>
            <span>Address 2 (Optional)</span>
            <input type='text' className='rounded-md border bg-gray-200 p-2' />
          </div>
          <div className='mb-2 flex flex-col'>
            <span>Postal Code</span>
            <input type='text' className='rounded-md border bg-gray-200 p-2' />
          </div>
          <div className='mb-2 flex flex-col'>
            <span>City</span>
            <input type='text' className='rounded-md border bg-gray-200 p-2' />
          </div>
          <div className='mb-2 flex flex-col'>
            <span>Country</span>
            <select className='rounded-md border bg-gray-200 p-2'>
              <option value=''>[ Select ]</option>
              <option value='CRI'>Costa Rica</option>
            </select>
          </div>
          <div className='mb-2 flex flex-col'>
            <span>Telephone</span>
            <input type='text' className='rounded-md border bg-gray-200 p-2' />
          </div>
          <div className='mb-2 flex flex-col sm:mt-10'>
            <Link
              href='/checkout'
              className='btn-primary flex w-full justify-center sm:w-1/2 '
            >
              Next
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
