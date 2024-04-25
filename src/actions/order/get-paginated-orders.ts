'use server'

import { auth } from '@/auth.config'
import prisma from '@/lib/prisma'
import { logger } from '@/logs/winston.config'

interface PaginationProps {
  page?: number
  take?: number
}

export const getPaginatedOrders = async ({
  page = 1,
  take = 2,
}: PaginationProps) => {
  const session = await auth()

  if (!session?.user) throw new Error('Session not found')

  try {
    const paginatedOrdersByUserId = prisma.order.findMany({
      where: {
        userId: session.user.id,
      },

      include: {
        OrderAddress: {
          select: {
            firstName: true,
            lastName: true,
          },
        },
      },

      take,
      skip: (page - 1) * take,
    })

    const totalOrdersByUserId = prisma.order.count({
      where: {
        userId: session.user.id,
      },
    })

    const paginationPromises = await Promise.all([
      paginatedOrdersByUserId,
      totalOrdersByUserId,
    ])

    if (!paginationPromises) throw new Error('Error getting orders')

    const [orders, totalOrders] = paginationPromises
    const totalPages = Math.ceil(totalOrders / take)

    return {
      ok: true,
      currentPage: page,
      limit: take,
      totalPages,
      orders,
    }
  } catch (error: any) {
    logger.error('Error getting pagination', error)

    return {
      ok: false,
      message: error.message,
    }
  }
}
