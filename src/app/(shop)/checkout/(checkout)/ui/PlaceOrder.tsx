'use client'

import { useAddressBoundStore, useCartBoundStore } from '@/store'
import { currencyFormat } from '@/utils'
import { useEffect, useState } from 'react'

export const PlaceOrder = () => {
  const [loaded, setLoaded] = useState(false)

  const { productsInCartQuantity, subTotalPrice, taxes, totalPriceWithTaxes } =
    useCartBoundStore((state) => state.getSummaryInformation())

  const { address: addressStore } = useAddressBoundStore()
  const {
    firstName,
    lastName,
    address,
    address2,
    city,
    telephone,
    postalCode,
    country,
  } = addressStore

  useEffect(() => {
    setLoaded(true)
  }, [])

  if (!loaded) {
    return <div>Loading...</div>
  }

  return (
    <div className='h-min rounded-xl bg-white p-7 shadow-xl'>
      <h2 className='mb-2 text-2xl'>Delivery Address</h2>
      <div className='mb-5'>
        <p>
          {firstName} {lastName}
        </p>
        <p className='font-bold'>{address}</p>
        <p>{address2}</p>
        <p>
          {city}, {country}
        </p>
        <p>CP. {postalCode}</p>
        <p>{telephone}</p>
      </div>

      {/* Divider */}
      <div className='mb-5 h-0.5 w-full rounded-none bg-gray-200' />

      <div>
        <h2 className='mb-2 text-2xl'>Order Summary</h2>
        <div className='grid grid-cols-2'>
          <span>Products number</span>
          <span className='text-right'>
            {productsInCartQuantity === 1
              ? '1 Product'
              : `${productsInCartQuantity} Products`}
          </span>
          <span>Subtotal</span>
          <span className='text-right'>
            {currencyFormat(subTotalPrice)} ARS
          </span>
          <span>Taxes (1000%)</span>
          <span className='text-right'>{currencyFormat(taxes)} ARS</span>
        </div>
      </div>
      <div className='mt-5 grid grid-cols-2'>
        <span className='text-2xl'>Total</span>
        <span className='text-right text-2xl'>
          {currencyFormat(totalPriceWithTaxes)} ARS
        </span>
      </div>
      <div className='mt-5 w-full'>
        <button
          // href={`/orders/123`}
          className='btn-primary mb-5 w-full'
        >
          Place order
        </button>
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
  )
}
