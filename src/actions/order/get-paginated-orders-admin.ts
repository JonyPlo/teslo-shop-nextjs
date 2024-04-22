'use server'

import { auth } from '@/auth.config'
import prisma from '@/lib/prisma'
import { logger } from '@/logs/winston.config'

interface PaginationProps {
  page?: number
  take?: number
}

export const getPaginatedOrdersAdmin = async ({
  page = 1,
  take = 2,
}: PaginationProps) => {
  const session = await auth()

  if (session?.user.role !== 'admin')
    throw new Error('Your must have an admin role')

  try {
    const paginatedOrdersByUserId = prisma.order.findMany({
      orderBy: {
        // Traemos todas las ordenes de la base de datos y las ordenamos por fecha de creacion descendente
        createdAt: 'desc',
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

    const totalOrdersByUserId = prisma.order.count({})

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
