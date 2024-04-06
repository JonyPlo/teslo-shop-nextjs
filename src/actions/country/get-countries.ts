'use server'

import prisma from '@/lib/prisma'
import { logger } from '@/logs/winston.config'

export const getCountries = async () => {
  try {
    const countries = await prisma.country.findMany({
      // Con la propiedad orderBy podemos ordenar los datos que nos devuelva la base de datos de manera ascendente o descendente
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
