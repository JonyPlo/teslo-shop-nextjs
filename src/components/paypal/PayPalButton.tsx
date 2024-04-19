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

  //! IMPORTANTE: El monto no debe ser superior a 4 decimales ya que PayPal no acepta mas de 4 decimales
  // Nos aseguramos de que el monto sea redondeado a dos decimales
  const roundedAmount = amount.toFixed(2).toString()

  // El callback createOrder hace que cuando el comprador selecciona el botón de PayPal, se abra la ventana de pago de PayPal. El comprador debera iniciar sesión con PayPal y aprobar la transacción en el sitio Web paypal.com.
  // El objetivo de esta funcion es retornar el id de la transaccion
  const createOrder = async (
    data: CreateOrderData,
    actions: CreateOrderActions
  ): Promise<string> => {
    //* Link con la documentacion de la API de paypal para generar ordenes: https://developer.paypal.com/docs/api/orders/v2/#orders-create-request-body
    try {
      const transactionId = await actions.order.create({
        // El intent en 'CAPTURE' indica que el comerciante captara el pago inmediatamente después de que el cliente realice un pago.
        intent: 'CAPTURE',
        purchase_units: [
          {
            // Con invoice_id podemos generar una relacion entre la orden de paypal y la orden de mi base de datos, y por eso es que en esta propiedad almacenamos el id de la orden que esta en la base de datos, luego cuando realicemos un pago, paypal nos retornara un objeto con informacion de la orden que se genero, y dentro de ese objeto tendremos una propiedad llamada "invoice_id" con el id de la orden que le pasamos aqui.
            // Esta propiedad tambien nos sirve como una validacion extra ya que si el usuario quiere realizar otra transaccion a la misma orden, paypal no lo permitira, ya que una orden solo se puede comprar una sola vez
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

      // Al presionar el boton de PayPal, antes de que aparezca el popup para iniciar sesion, esta funciona ya nos habra retornado el id de la transaccion
      return transactionId
    } catch (error: any) {
      console.log(error)
      return error.message
    }
  }

  // El callback onApprove se ejecuta cuando se realiza el proceso de la transaccion exitosamente, es decir, cuando el usuario presiona el boton de PayPal, se abre la ventana para realizar el pago, realiza el pago y regresa a la aplicacion
  const onApprove = async (
    data: OnApproveData,
    actions: OnApproveActions
  ): Promise<void> => {
    // La promesa capture() nos retorna un objeto con informacion de una transaccion, y entre toda esa informacion podemos obtener el "id" de la transaccion que se creo anteriormente cuando ejecutamos el callback createOrder()
    const datails = await actions.order?.capture()

    if (!datails) return

    // En este server action vamos a verificar si se realizo el pago del cliente exitosamente o no
    // El 'details.id' es el id de la transaccion
    await paypalCheckPayment(datails.id!)
  }

  return (
    <div className='relative -z-0'>
      {/* El boton de paypal requiere algunos callbacks para funcionar */}
      <PayPalButtons createOrder={createOrder} onApprove={onApprove} />
    </div>
  )
}
