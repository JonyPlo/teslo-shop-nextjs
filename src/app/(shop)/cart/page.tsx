import Link from 'next/link'

import { Title } from '@/components'
import { ProductsInCart } from './ui/ProductsInCart'

export default function CartPage() {
  // redirect('/empty')

  return (
    <div className='flex items-center justify-center'>
      <div className='mb-20 flex w-[1000px] flex-col xl:mb-0'>
        <Title title='Cart' />
        <div className='grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-0  md:gap-10'>
          {/* Cart */}
          <div className='p-5 sm:p-7'>
            {/* Cart Items */}
            <ProductsInCart />
          </div>

          {/* Order Summary */}
          <div className='flex h-fit flex-col justify-between rounded-xl bg-white p-5 shadow-xl sm:p-7'>
            <div>
              <h2 className='mb-2 text-2xl'>Order Summary</h2>
              <div className='grid grid-cols-2'>
                <span>Products number</span>
                <span className='text-right'>3 Items</span>
                <span>Subtotal</span>
                <span className='text-right'>$ 100</span>
                <span>Taxes (15%)</span>
                <span className='text-right'>$ 100</span>
              </div>
            </div>
            <div className='mt-5'>
              <div className='grid grid-cols-2'>
                <span className='text-2xl'>Total</span>
                <span className='text-right text-2xl'>$ 100</span>
              </div>
              <div className='mt-5 w-full'>
                <Link
                  href={'/checkout/address'}
                  className='btn-primary flex justify-center'
                >
                  Checkout
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
