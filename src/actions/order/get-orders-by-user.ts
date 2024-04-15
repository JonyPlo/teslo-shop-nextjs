'use server'

import { auth } from '@/auth.config'
import prisma from '@/lib/prisma'
import { logger } from '@/logs/winston.config'

export const getOrdersBySessionUser = async () => {
  const session = await auth()

  if (!session?.user) throw new Error('User session not found')

  try {
    const orders = await prisma.order.findMany({
      where: {
        userId: session.user.id,
      },
    })

    if (!orders) throw new Error('Orders not found')

    return {
      ok: true,
      orders,
      userName: session.user.name,
    }
  } catch (error: any) {
    logger.error('Error getting order')

    return {
      ok: false,
      message: error.message,
    }
  }
}
