'use client'

import { PayPalButtons, usePayPalScriptReducer } from '@paypal/react-paypal-js'
import {
  CreateOrderData,
  CreateOrderActions,
  OnApproveData,
  OnApproveActions,
} from '@paypal/paypal-js'
import { paypalCheckPayment, setTransactionaId } from '@/actions'

interface Props {
  orderId: string
  amount: number
}

export const PayPalButton = ({ orderId, amount }: Props) => {
  const [{ isPending }] = usePayPalScriptReducer()

  if (isPending) {
    return (
      <div className='animate-pulse'>
        <div className='h-11 rounded bg-gray-300' />
        <div className='mt-4 h-20 rounded bg-gray-300' />
      </div>
    )
  }

  const roundedAmount = amount.toFixed(2).toString()

  const createOrder = async (
    data: CreateOrderData,
    actions: CreateOrderActions
  ): Promise<string> => {
    try {
      const transactionId = await actions.order.create({
        intent: 'CAPTURE',
        purchase_units: [
          {
            invoice_id: orderId,
            amount: {
              value: roundedAmount,
              currency_code: 'USD',
            },
          },
        ],
      })

      if (!transactionId) throw new Error('Error getting transaction id')

      const { ok } = await setTransactionaId({ orderId, transactionId })

      if (!ok) throw new Error('Error to set transaction id in order')

      return transactionId
    } catch (error: any) {
      console.log(error)
      return error.message
    }
  }

  const onApprove = async (
    data: OnApproveData,
    actions: OnApproveActions
  ): Promise<void> => {
    const datails = await actions.order?.capture()

    if (!datails) return

    await paypalCheckPayment(datails.id!)
  }

  return (
    <div className='relative -z-0'>
      <PayPalButtons createOrder={createOrder} onApprove={onApprove} />
    </div>
  )
}
