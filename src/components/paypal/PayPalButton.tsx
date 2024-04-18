'use client'

import { PayPalButtons, usePayPalScriptReducer } from '@paypal/react-paypal-js'
import { CreateOrderData, CreateOrderActions } from '@paypal/paypal-js'

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

  //! IMPORTANTE: El monto no debe ser superior a 4 decimales ya que PayPal no acepta mas de 4 decimales
  // Nos aseguramos de que el monto sea redondeado a dos decimales
  const roundedAmount = amount.toFixed(2).toString()

  // El objetivo de esta funcion es retornar el id de la transaccion
  const createOrder = async (
    data: CreateOrderData,
    actions: CreateOrderActions
  ): Promise<string> => {
    //* Link con la documentacion de la API de paypal para generar ordenes: https://developer.paypal.com/docs/api/orders/v2/#orders-create-request-body
    const transactionId = await actions.order.create({
      // El intent en 'CAPTURE' indica que el comerciante captara el pago inmediatamente después de que el cliente realice un pago.
      intent: 'CAPTURE',
      purchase_units: [
        {
          // reference_id: 'order_id',
          // invoice_id: orderId,
          amount: {
            value: roundedAmount,
            currency_code: 'USD',
          },
        },
      ],
    })

    console.log(transactionId)

    // Al presionar el boton de PayPal, antes de que aparezca el popup para iniciar sesion, esta funciona ya nos habra retornado el id de la transaccion
    return transactionId
  }

  return (
    // El boton de paypal requiere algunos callbacks para funcionar
    <PayPalButtons
      // El callback createOrder hace que cuando el comprador selecciona el botón de PayPal, se abra la ventana de pago de PayPal. El comprador debera iniciar sesión con PayPal y aprobar la transacción en el sitio Web paypal.com.
      createOrder={createOrder}
      // onApprove={}
    />
  )
}
