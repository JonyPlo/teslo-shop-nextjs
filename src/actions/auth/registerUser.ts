'use server'

import bcrypt from 'bcryptjs'
import prisma from '@/lib/prisma'
import { logger } from '@/logs/winston.config'

// Esta es de la forma tradicional usando un server action, no la que recomienda usar nextjs para trabajar con nextauth usando el atributo action del form, el hook useFormState, etc. simplemente creamos el server action, y lo mandamos a llamar en algun onSubmit de un formulario pasandole los datos del usuario

interface RegisterForm {
  name: string
  email: string
  password: string
}

export const registerUser = async ({ name, email, password }: RegisterForm) => {
  const createUserOptions = {
    // En data envio un objeto con los campos del usuario que quiero crear
    data: {
      name,
      email: email.toLowerCase(),
      password: bcrypt.hashSync(password),
    },
    // Con 'select' defino que campos o propiedades del objeto que acabo de crear quiero que me retorne para despues usar esa informacion, por ejemplo, con 'id' en true estamos diciendo que en ese objeto que nos retorna prisma, nos incluya el id del usuario que se acaba de crear en la db
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
