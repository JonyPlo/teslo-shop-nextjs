import { Title } from '@/components'
import { ProductsInCart } from './ui/ProductsInCart'
import { PlaceOrder } from './ui/PlaceOrder'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export default function CartPage() {
  const cookieStore = cookies()
  const productsInCart = JSON.parse(
    cookieStore.get('productsInCart')?.value ?? '[]'
  )
  const hasCookieCart = cookieStore.has('productsInCart')

  if (!hasCookieCart || productsInCart.length === 0) redirect('/')

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
