'use server'

import { auth } from '@/auth.config'
import prisma from '@/lib/prisma'
import { logger } from '@/logs/winston.config'
import { revalidatePath } from 'next/cache'

export const changeUserRole = async (userId: string, role: string) => {
  const session = await auth()

  if (session?.user.role !== 'admin') throw new Error('Unauthorized')

  try {
    const newRole = role === 'admin' ? 'admin' : 'user'

    const user = await prisma.user.update({
      where: {
        id: userId,
      },

      data: {
        role: newRole,
      },
    })

    if (!user) throw new Error('User not found')

    revalidatePath('/admin/users')

    return {
      ok: true,
    }
  } catch (error: any) {
    logger.error('Error', error)

    return {
      ok: false,
      message: error.message,
    }
  }
}
