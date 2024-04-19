'use server'

import { logger } from '@/logs/winston.config'

export const paypalCheckPayment = async (paypalTransactionId: string) => {
  try {
    const authToken = await getPayPalBearerToken()

    if (!authToken) throw new Error('Error getting PayPal token')

    console.log({ authToken })
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
    const result = await fetch(oauth2Url, requestOptions).then((resp) =>
      resp.json()
    )

    return result.access_token
  } catch (error: any) {
    logger.error('Error getting bearer token', error)
    return null
  }
}
