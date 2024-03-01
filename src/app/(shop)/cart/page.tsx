import { QuantitySelector, Title } from '@/components'
import { initialData } from '@/seed/seed'
import Image from 'next/image'
import Link from 'next/link'
import { redirect } from 'next/navigation'

const productsInCart = [
  initialData.products[0],
  initialData.products[1],
  initialData.products[2],
]

export default function CartPage() {
  // redirect('/empty')

  return (
    <div className='mb-72 flex items-center justify-center px-10 sm:px-0'>
      <div className='flex w-[1000px] flex-col'>
        <Title title='Cart' />
        <div className='grid grid-cols-1 gap-10 sm:grid-cols-2'>
          {/* Cart */}
          <div className='mt-5 flex flex-col'>
            <span className='text-xl'>Add more items</span>
            <Link href={'/'} className='mb-5 underline'>
              Keep shopping
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
                  <p>${product.price}</p>
                  <QuantitySelector quantity={3} />
                  <button className='mt-3 underline'>Remove</button>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className='h-min rounded-xl bg-white p-7 shadow-xl'>
            <h2 className='mb-2 text-2xl'>Order Summary</h2>
            <div className='grid grid-cols-2'>
              <span>Products number</span>
              <span className='text-right'>3 Items</span>
              <span>Subtotal</span>
              <span className='text-right'>$ 100</span>
              <span>Taxes (15%)</span>
              <span className='text-right'>$ 100</span>
            </div>
            <div className='grid grid-cols-2'>
              <span className='mt-5 text-2xl'>Total</span>
              <span className='mt-5 text-right text-2xl'>$ 100</span>
            </div>
            <div className='mb-2 mt-5 w-full'>
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
  )
}
