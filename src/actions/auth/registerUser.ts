'use server'

import bcrypt from 'bcryptjs'
import prisma from '@/lib/prisma'
import { logger } from '@/logs/winston.config'

interface RegisterForm {
  name: string
  email: string
  password: string
}

export const registerUser = async ({ name, email, password }: RegisterForm) => {
  const createUserOptions = {
    data: {
      name,
      email: email.toLowerCase(),
      password: bcrypt.hashSync(password),
    },

    select: {
      id: true,
      name: true,
      email: true,
    },
  }

  try {
    const user = await prisma.user.create(createUserOptions)

    return {
      ok: true,
      user,
      message: 'User created',
    }
  } catch (error) {
    logger.error('Error creating user', error)

    return {
      ok: false,
      message: 'Error creating user',
    }
  }
}
