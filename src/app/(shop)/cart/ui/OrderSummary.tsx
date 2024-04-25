'use client'

import { useCartBoundStore } from '@/store'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { currencyFormat } from '../../../../utils'
import { TAX_PERCENTAGE } from '@/components'

export const OrderSummary = () => {
  const [loaded, setLoaded] = useState(false)
  const { productsInCartQuantity, subTotalPrice, taxes, totalPriceWithTaxes } =
    useCartBoundStore((state) => state.getSummaryInformation())

  useEffect(() => {
    setLoaded(true)
  }, [])

  if (!loaded) {
    return <div>Loading...</div>
  }

  return (
    <>
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
            {currencyFormat(subTotalPrice)} USD
          </span>
          <span>Taxes ({TAX_PERCENTAGE}%)</span>
          <span className='text-right'>{currencyFormat(taxes)} USD</span>
        </div>
      </div>
      <div className='mt-5'>
        <div className='grid grid-cols-2'>
          <span className='text-2xl'>Total</span>
          <span className='text-right text-2xl'>
            {currencyFormat(totalPriceWithTaxes)} USD
          </span>
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
    </>
  )
}
