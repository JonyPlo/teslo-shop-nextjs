'use server'

import { auth } from '@/auth.config'
import prisma from '@/lib/prisma'
import { logger } from '@/logs/winston.config'

interface PaginationProps {
  page?: number
  take?: number
}

export const getPaginatedUsers = async ({
  page = 1,
  take = 10,
}: PaginationProps) => {
  try {
    const session = await auth()

    if (session?.user.role !== 'admin') throw new Error('Unauthorized')

    const users = await prisma.user.findMany({
      orderBy: {
        name: 'desc',
      },

      take,
      skip: (page - 1) * take,
    })

    if (!users) throw new Error('Users not found')

    const totalUsers = await prisma.user.count({})

    if (!totalUsers) throw new Error('Error getting total users count')

    const totalPages = Math.ceil(totalUsers / take)

    return {
      ok: true,
      currentPage: page,
      limit: take,
      users,
      totalPages,
    }
  } catch (error: any) {
    logger.error('Error', error)

    return {
      ok: false,
      error: error.message,
    }
  }
}
