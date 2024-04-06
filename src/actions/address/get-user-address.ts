'use server'

import prisma from '@/lib/prisma'
import { logger } from '@/logs/winston.config'

export const getUserAddress = async (userId: string) => {
  try {
    const address = await prisma.userAddress.findUnique({
      where: { userId },
    })

    if (!address) return null

    const { id, userId: _, countryId, address2, ...rest } = address

    return {
      ...rest,
      country: countryId,
      address2: address2 ? address2 : '',
    }
  } catch (error) {
    logger.error('Error getting user')
    return null
  }
}
