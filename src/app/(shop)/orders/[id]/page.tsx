import { Title } from '@/components'
import { initialData } from '@/seed/seed'
import { cn } from '@/utils'
import Image from 'next/image'
import { IoCardOutline } from 'react-icons/io5'

const productsInCart = [
  initialData.products[0],
  initialData.products[1],
  initialData.products[2],
]

interface Props {
  params: {
    id: string
  }
}

export default function CartPage({ params }: Props) {
  const { id } = params

  return (
    <div className='mb-72 flex items-center justify-center px-10 sm:px-0'>
      <div className='flex w-[1000px] flex-col'>
        <Title title={`Order #${id}`} />
        <div className='grid grid-cols-1 gap-10 sm:grid-cols-2'>
          {/* Cart */}
          <div className='mt-5 flex flex-col'>
            <div
              className={cn(
                // Base styles
                'mb-6 flex items-center rounded px-3.5 py-2 text-xs font-bold text-white',
                // Paid order styles
                {
                  'bg-red-500': false,
                  'bg-green-700': true,
                }
              )}
            >
              <IoCardOutline size={30} />
              {/* <span className="mx-2">Outstanding</span> */}
              <span className='mx-2'>Paid</span>
            </div>

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
              <div
                className={cn(
                  'flex items-center rounded px-3.5 py-2 text-xs font-bold text-white',
                  {
                    'bg-red-500': false,
                    'bg-green-700': true,
                  }
                )}
              >
                <IoCardOutline size={30} />
                {/* <span className="mx-2">Outstanding</span> */}
                <span className='mx-2'>Paid</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
