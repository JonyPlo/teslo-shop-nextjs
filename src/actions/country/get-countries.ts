'use server'

import prisma from '@/lib/prisma'
import { logger } from '@/logs/winston.config'

export const getCountries = async () => {
  try {
    const countries = await prisma.country.findMany({
      orderBy: {
        name: 'asc',
      },
    })

    return countries
  } catch (error) {
    logger.error(error)
    return []
  }
}
