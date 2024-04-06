'use server'

import { type Address } from '@/interfaces'
import prisma from '@/lib/prisma'
import { logger } from '@/logs/winston.config'

export const setUserAddress = async (address: Address, userId: string) => {
  try {
    const newAddress = await createOrReplaceAddress(address, userId)

    return {
      ok: true,
      address: newAddress,
    }
  } catch (error) {
    logger.error('Error', error)

    return {
      ok: false,
      message: 'Error saving address',
    }
  }
}

const createOrReplaceAddress = async (address: Address, userId: string) => {
  const { country, ...addressRest } = address

  const addressToSave = {
    ...addressRest,
    countryId: country,
    userId,
  }

  try {
    const storeAddress = await prisma.userAddress.findUnique({
      where: {
        userId,
      },
    })

    // Create Address
    if (!storeAddress) {
      const newAddress = await prisma.userAddress.create({
        data: addressToSave,
      })

      return newAddress
    }

    // Update Address
    const updatedAddress = await prisma.userAddress.update({
      where: {
        userId,
      },
      data: addressToSave,
    })

    return updatedAddress
  } catch (error) {
    logger.error('Error creating or updating address', error)
    throw new Error('Error creating or updating address')
  }
}
