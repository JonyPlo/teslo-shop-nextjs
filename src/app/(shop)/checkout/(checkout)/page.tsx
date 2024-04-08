import { Title } from '@/components'
import { initialData } from '@/seed/seed'
import Image from 'next/image'
import Link from 'next/link'
import { ProductsInCart } from './ui/ProductsInCart'
import { PlaceOrder } from './ui/PlaceOrder'

const productsInCart = [
  initialData.products[0],
  initialData.products[1],
  initialData.products[2],
]

export default function CartPage() {
  return (
    <div className='mb-72 flex items-center justify-center px-10 sm:px-0'>
      <div className='flex w-[1000px] flex-col'>
        <Title title='Check Order' />
        <div className='grid grid-cols-1 gap-10 sm:grid-cols-2'>
          {/* Cart */}
          <div className='mt-5 flex flex-col'>
            {/* Cart Items */}
            <ProductsInCart />
          </div>
          {/* Order Summary */}
          <PlaceOrder />
        </div>
      </div>
    </div>
  )
}
