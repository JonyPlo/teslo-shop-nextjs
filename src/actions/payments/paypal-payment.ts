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

    const { invoice_id: orderId } = purchase_units[0]

    await prisma.order.update({
      where: {
        id: orderId,
      },
      data: {
        isPaid: true,
        paidAt: new Date(),
      },
    })

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

const getPayPalBearerToken = async (): Promise<string | null> => {
  const oauth2Url = process.env.PAYPAL_OAUTH_URL ?? ''

  const PAYPAL_CLIENT_ID = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID
  const PAYPAL_SECRET = process.env.PAYPAL_SECRET

  const base64Token = Buffer.from(
    `${PAYPAL_CLIENT_ID}:${PAYPAL_SECRET}`,
    'utf-8'
  ).toString('base64')

  const myHeaders = new Headers()
  myHeaders.append('Content-Type', 'application/x-www-form-urlencoded')
  myHeaders.append('Authorization', `Basic ${base64Token}}`)

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

      cache: 'no-store',
    }).then((resp) => resp.json())

    return result.access_token
  } catch (error: any) {
    logger.error('Error getting bearer token', error)
    return null
  }
}

const verifyPayPalPayment = async (
  paypalTransactionId: string,
  bearerToken: string
): Promise<PayPalOrderStatusResponse | null> => {
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
