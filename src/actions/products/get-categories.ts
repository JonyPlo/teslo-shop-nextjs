'use server'

import prisma from '@/lib/prisma'
import { logger } from '@/logs/winston.config'

export const getCategories = async () => {
  try {
    const categories = await prisma.category.findMany({
      orderBy: {
        name: 'asc',
      },
    })

    return categories
  } catch (error: any) {
    logger.error('Error', error)

    return []
  }
}
