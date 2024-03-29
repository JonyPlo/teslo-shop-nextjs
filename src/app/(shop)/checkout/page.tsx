import { Title } from '@/components'
import { initialData } from '@/seed/seed'
import Image from 'next/image'
import Link from 'next/link'

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
            <span className='text-xl'>Adjust elements</span>
            <Link href={'/cart'} className='mb-5 underline'>
              Edit cart
            </Link>

            {/* Cart Items */}
            {productsInCart.map((product) => (
              <div key={product.slug} className='mb-5 flex'>
                <Image
                  src={`/products/${product.images[0]}`}
                  width={100}
                  height={100}
                  alt={product.title}
                  className='mr-5 rounded'
                  style={{
                    width: '100px',
                    height: '100px',
                  }}
                />
                <div>
                  <p>{product.title}</p>
                  <p>${product.price} x 3</p>
                  <p className='font-bold'>Subtotal: ${product.price * 3}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className='h-min rounded-xl bg-white p-7 shadow-xl'>
            <h2 className='mb-2 text-2xl'>Delivery Address</h2>
            <div className='mb-5'>
              <p>Jonathan Plodzien</p>
              <p className='font-bold'>Marcos Avellaneda 1571</p>
              <p>San Miguel de Tucuman</p>
              <p>Tucuman</p>
              <p>CP 4000</p>
              <p>3816126830</p>
            </div>

            {/* Divider */}
            <div className='mb-5 h-0.5 w-full rounded-none bg-gray-200' />

            <h2 className='mb-2 text-2xl'>Order Summary</h2>
            <div className='mb-5 grid grid-cols-2'>
              <span>Products number</span>
              <span className='text-right'>3 Items</span>
              <span>Subtotal</span>
              <span className='text-right'>$ 100</span>
              <span>Taxes (15%)</span>
              <span className='text-right'>$ 100</span>
            </div>
            <div className='mb-5 grid grid-cols-2'>
              <span className='text-2xl'>Total</span>
              <span className='text-right text-2xl'>$ 100</span>
            </div>
            <div className='w-full'>
              <Link
                href={`/orders/123`}
                className='btn-primary mb-5 flex justify-center'
              >
                Place order
              </Link>
              <p>
                {/* Disclaimer */}
                <span className='text-xs'>
                  By clicking on &quot;Place order&quot;, you accept our{' '}
                  <a href='#' className='underline'>
                    Terms and Conditions
                  </a>
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
