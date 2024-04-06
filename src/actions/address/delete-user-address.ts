'use server'

import prisma from '@/lib/prisma'
import { logger } from '@/logs/winston.config'

export const deleteUserAddress = async (userId: string) => {
  try {
    await prisma.userAddress.delete({
      where: {
        userId,
      },
    })

    return {
      ok: true,
    }
  } catch (error) {
    logger.error('Error deleting address', error)
    return {
      ok: false,
      message: 'Error deleting address',
    }
  }
}
