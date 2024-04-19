'use server'

import prisma from '@/lib/prisma'
import { logger } from '../../logs/winston.config'

interface Props {
  orderId: string
  transactionId: string
}

export const setTransactionaId = async ({ orderId, transactionId }: Props) => {
  try {
    const order = await prisma.order.update({
      where: {
        id: orderId,
      },
      data: {
        transactionId,
      },
    })

    if (!order) {
      return {
        ok: false,
        message: `Order ${orderId} not found`,
      }
    }

    return {
      ok: true,
      message: 'Transaction id set',
    }
  } catch (error: any) {
    logger.error('Error to set transaction id in order', error)

    return {
      ok: false,
      message: error.message,
    }
  }
}
