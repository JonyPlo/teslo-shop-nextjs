import { Title } from '@/components'
import { ProductsInCart } from './ui/ProductsInCart'
import { OrderSummary } from './ui/OrderSummary'

export default function CartPage() {
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
            <OrderSummary />
          </div>
        </div>
      </div>
    </div>
  )
}
