'use server'

import { PayPalOrderStatusResponse } from '@/interfaces'
import prisma from '@/lib/prisma'
import { logger } from '@/logs/winston.config'
import { revalidatePath } from 'next/cache'

export const paypalCheckPayment = async (paypalTransactionId: string) => {
  try {
    const authToken = await getPayPalBearerToken()
    if (!authToken) throw new Error('Error getting PayPal token')

    const resp = await verifyPayPalPayment(paypalTransactionId, authToken)
    if (!resp) throw new Error('Error verifying paypal payment')

    const { status, purchase_units } = resp
    if (status !== 'COMPLETED') throw new Error('Payment has not been made yet')

    // Obtenemos el id de la orden que esta en nuestra base de datos
    const { invoice_id: orderId } = purchase_units[0]

    // Realizamos la actualizacion en la orden en la base de datos
    await prisma.order.update({
      where: {
        id: orderId,
      },
      data: {
        isPaid: true,
        paidAt: new Date(),
      },
    })

    // Por ultimo revalidamos el path para que next actualice en la pagina del cliente los datos que fueron actualizados, en otras palabras, en lugar de hacer un refresh en la pagina, next actualizara en la pagina solo los datos que hayan sido afectados en todo este proceso sin necesidad de un refresh
    revalidatePath(`/orders/${orderId}`)

    return {
      ok: true,
    }
  } catch (error: any) {
    logger.error('Error checking payment', error)

    return {
      ok: false,
      message: error.message,
    }
  }
}

// Esta funcion nos devolvera el token de acceso a la informacion de una transaccion
const getPayPalBearerToken = async (): Promise<string | null> => {
  //* Video para saber de donde se extrajo toda esta peticion: https://www.udemy.com/course/nextjs-fh/learn/lecture/41267210#questions

  // Esta es la url que se encarga de enviar la informacion a PayPal para poder autenticarnos y luego devolvernos el token
  const oauth2Url = process.env.PAYPAL_OAUTH_URL ?? ''

  // Tanto el Client ID como el Secret Key que generamos en PeyPal, ambos nos sirven para autenticarnos y asi poder realizar la peticion POST a PayPal y asi obtener el Token que nos de acceso a la informacion de una transaccion
  // El CLIENT ID es nuestro username y el SECRET KEY es nuestro password para poder autenticarnos en PeyPal
  const PAYPAL_CLIENT_ID = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID
  const PAYPAL_SECRET = process.env.PAYPAL_SECRET

  // Aqui estamos tomando el "username" y "password" que usaremos para autenticarnos y los convertiremos en una cadena de base64 para poder encriptar la informacion ya que asi lo solicita PayPal
  const base64Token = Buffer.from(
    `${PAYPAL_CLIENT_ID}:${PAYPAL_SECRET}`,
    'utf-8'
  ).toString('base64')

  const myHeaders = new Headers()
  myHeaders.append('Content-Type', 'application/x-www-form-urlencoded')
  myHeaders.append('Authorization', `Basic ${base64Token}}`)

  // Importante agregar este grant_type con client_credentials en el body ya que es requerido por PayPal
  const urlencoded = new URLSearchParams()
  urlencoded.append('grant_type', 'client_credentials')

  const requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: urlencoded,
  }

  try {
    const result = await fetch(oauth2Url, {
      ...requestOptions,
      // cache: 'no-store' es para que next no mantenga en cache la respuesta, en este caso es util ya que el token de paypal se guardaria en cache, pero el token tiene vencimiento, por lo tanto a la hora de intentar hacer un pago no podremos porque paypal intentara usar ese token que ya vencio en lugar de generar uno nuevo, asi que para evitar esto no guardamos la respuesta en la cache y que se tenga que volver a realizar la peticion en cada fetch
      cache: 'no-store',
    }).then((resp) => resp.json())

    return result.access_token
  } catch (error: any) {
    logger.error('Error getting bearer token', error)
    return null
  }
}

// Esta accion nos sirve para poder verificar un pago
const verifyPayPalPayment = async (
  paypalTransactionId: string,
  bearerToken: string
): Promise<PayPalOrderStatusResponse | null> => {
  // Url para poder obtener datos de una orden de paypal
  // Ejemplo de la url: https://api.sandbox.paypal.com/v2/checkout/orders/7WF00316YT5642909
  const paypalOrderUrl = `${process.env.PAYPAL_ORDERS_URL}/${paypalTransactionId}`

  const myHeaders = new Headers()
  myHeaders.append('Authorization', `Bearer ${bearerToken}`)

  const requestOptions = {
    method: 'GET',
    headers: myHeaders,
  }

  try {
    const result = await fetch(paypalOrderUrl, {
      ...requestOptions,
      cache: 'no-store',
    }).then((resp) => resp.json())

    return result
  } catch (error: any) {
    logger.error('Error verifying paypal payment', error)

    return null
  }
}
