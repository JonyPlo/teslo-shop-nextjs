import { Title } from '@/components'
import { initialData } from '@/seed/seed'
import clsx from 'clsx'
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
    <div className='flex justify-center items-center mb-72 px-10 sm:px-0'>
      <div className='flex flex-col w-[1000px]'>
        <Title title={`Order #${id}`} />
        <div className='grid grid-cols-1 sm:grid-cols-2 gap-10'>
          {/* Cart */}
          <div className='flex flex-col mt-5'>
            <div
              className={clsx(
                'flex items-center rounded py-2 px-3.5 text-xs font-bold text-white mb-6',
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
                  <p>${product.price} x 3</p>
                  <p className='font-bold'>Subtotal: ${product.price * 3}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className='bg-white rounded-xl shadow-xl p-7 h-min'>
            <h2 className='text-2xl mb-2'>Delivery Address</h2>
            <div className='mb-5'>
              <p>Jonathan Plodzien</p>
              <p className='font-bold'>Marcos Avellaneda 1571</p>
              <p>San Miguel de Tucuman</p>
              <p>Tucuman</p>
              <p>CP 4000</p>
              <p>3816126830</p>
            </div>

            {/* Divider */}
            <div className='w-full h-0.5 rounded-none bg-gray-200 mb-5' />

            <h2 className='text-2xl mb-2'>Order Summary</h2>
            <div className='grid grid-cols-2 mb-5'>
              <span>Products number</span>
              <span className='text-right'>3 Items</span>
              <span>Subtotal</span>
              <span className='text-right'>$ 100</span>
              <span>Taxes (15%)</span>
              <span className='text-right'>$ 100</span>
            </div>
            <div className='grid grid-cols-2 mb-5'>
              <span className='text-2xl'>Total</span>
              <span className='text-2xl text-right'>$ 100</span>
            </div>
            <div className='w-full'>
              <div
                className={clsx(
                  'flex items-center rounded py-2 px-3.5 text-xs font-bold text-white',
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
