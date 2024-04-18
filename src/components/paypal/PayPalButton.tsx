'use client'

import { PayPalButtons, usePayPalScriptReducer } from '@paypal/react-paypal-js'

export const PayPalButton = () => {
  const [{ isPending }] = usePayPalScriptReducer()

  if (isPending) {
    return (
      <div className='animate-pulse'>
        <div className='h-11 rounded bg-gray-300' />
        <div className='mt-4 h-20 rounded bg-gray-300' />
      </div>
    )
  }

  return <PayPalButtons />
}
