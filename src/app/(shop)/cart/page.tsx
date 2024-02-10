import { QuantitySelector, Title } from '@/components'
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
    <div className='flex justify-center items-center mb-72 px-10 sm:px-0'>
      <div className='flex flex-col w-[1000px]'>
        <Title title='Cart' />
        <div className='grid grid-cols-1 sm:grid-cols-2 gap-10'>
          {/* Cart */}
          <div className='flex flex-col mt-5'>
            <span className='text-xl'>Add more items</span>
            <Link href={'/'} className='underline mb-5'>
              Keep shopping
            </Link>

            {/* Cart Items */}
            {productsInCart.map((product) => (
              <div key={product.slug} className='flex mb-5'>
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
                  <p>${product.price}</p>
                  <QuantitySelector quantity={3} />
                  <button className='underline mt-3'>Remove</button>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className='bg-white rounded-xl shadow-xl p-7 h-min'>
            <h2 className='text-2xl mb-2'>Order Summary</h2>
            <div className='grid grid-cols-2'>
              <span>Products number</span>
              <span className='text-right'>3 Items</span>
              <span>Subtotal</span>
              <span className='text-right'>$ 100</span>
              <span>Taxes (15%)</span>
              <span className='text-right'>$ 100</span>
            </div>
            <div className='grid grid-cols-2'>
              <span className='text-2xl mt-5'>Total</span>
              <span className='text-2xl mt-5 text-right'>$ 100</span>
            </div>
            <div className='mt-5 mb-2 w-full'>
              <Link
                href={'/checkout/address'}
                className='flex btn-primary justify-center'
              >
                Checkout
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
