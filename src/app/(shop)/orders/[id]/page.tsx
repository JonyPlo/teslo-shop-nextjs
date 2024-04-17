import { getOrderById } from '@/actions'
import { PayPalButton, PaymentStatusAlert, Title } from '@/components'
import Image from 'next/image'
import { currencyFormat } from '@/utils'
import { redirect } from 'next/navigation'

interface Props {
  params: {
    id: string
  }
}

export default async function CartPage({ params }: Props) {
  const { id } = params
  const { ok, orderAddress, orderItems, orderSummary } = await getOrderById(id)

  if (!ok) redirect('/')

  const address = orderAddress!
  const items = orderItems!
  const summary = orderSummary!

  return (
    <div className='mb-72 flex items-center justify-center px-10 sm:px-0'>
      <div className='flex w-[1000px] flex-col'>
        <Title title={`Order #${id.split('-').at(-1)}`} />
        <div className='grid grid-cols-1 gap-10 sm:grid-cols-2'>
          {/* Cart */}
          <div className='flex flex-col'>
            {/* Cart Items */}
            <div className='mb-5'>
              <PaymentStatusAlert summary={summary.isPaid} />
            </div>
            {items.map((product) => (
              <div
                key={`${product.slug}-${product.size}`}
                className='mb-5 flex'
              >
                <Image
                  src={`/products/${product.image}`}
                  width={100}
                  height={100}
                  alt={product.title}
                  className='mr-5 rounded'
                  style={{
                    width: '100px',
                    height: '100px',
                  }}
                  priority
                />
                <div>
                  <p>
                    {product.size} - {product.title}
                  </p>
                  <p>
                    ${product.price} x {product.quantity}
                  </p>
                  <p className='font-bold'>
                    Subtotal: ${product.price * product.quantity}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Delivery Address */}
          <div className='h-min rounded-xl bg-white p-7 shadow-xl'>
            <h2 className='mb-2 text-2xl'>Delivery Address</h2>
            <div className='mb-5'>
              <p>
                {address.firstName} {address.lastName}
              </p>
              <p className='font-bold'>{address.address}</p>
              <p>{address.address2}</p>
              <p>
                {address.city}, {address.country.name}
              </p>
              <p>CP. {address.postalCode}</p>
              <p>{address.telephone}</p>
            </div>

            {/* Divider */}
            <div className='mb-5 h-0.5 w-full rounded-none bg-gray-200' />

            {/* Order summary */}
            <div>
              <h2 className='mb-2 text-2xl'>Order Summary</h2>
              <div className='grid grid-cols-2'>
                <span>Products number</span>
                <span className='text-right'>
                  {summary.itemsInOrder === 1
                    ? '1 Product'
                    : `${summary.itemsInOrder} Products`}
                </span>
                <span>Subtotal</span>
                <span className='text-right'>
                  {currencyFormat(summary.subTotal)} ARS
                </span>
                <span>Taxes (100%)</span>
                <span className='text-right'>
                  {currencyFormat(summary.tax)} ARS
                </span>
              </div>
            </div>
            <div className='mt-5'>
              <div className='grid grid-cols-2'>
                <span className='text-2xl'>Total</span>
                <span className='text-right text-2xl'>
                  {currencyFormat(summary.total)} ARS
                </span>
              </div>
              <div className='mt-5 w-full'>
                <PayPalButton />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
