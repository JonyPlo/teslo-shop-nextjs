'use server'

import { signIn } from '@/auth.config'
import { logger } from '@/logs/winston.config'
import { AuthError } from 'next-auth'

// Esta es de la forma que recomienda hacerlo nextjs, trayendo la informacion que fue enviada por el dispatch en el atributo 'action' del formulario, mirar la pagina que contiene el formulario del login para verlo mejor

export async function authenticate(
  prevState: string | undefined,
  formData: FormData
) {
  try {
    // El metodo 'signIn' recibe dos parametros: 'credentials' y 'formData', el 'credentials' es el metodo que viene del provider en el archivo 'auth.config.ts', si en el provider estuvieramos haciendo el login con google entonces en vez de 'credentials' deberia ser 'google', y el 'formData' es el objeto que contiene el email y password que recibimos del formulario de login
    // Si la promesa es exitosa entonces el metodo 'signIn' se encargara de iniciar sesion y actualizara el navegador con las credenciales automaticamente
    //! IMPORTANTE: Un server action no puede redireccionar a otras paginas porque esta en el servidor y no sabe como hacerlo, asi que para eso vamos a mandar un objeto como segundo argumento el cual tendra las propiedades del 'formData' dispersadas y a eso le sumamos la propiedad 'redirect' en false, hay que hacer esto ya que si no lo agregamos, al hacer el login se refrescara la pagina del login por lo tanto lo que retornemos desde aqui no llegara a la pagina porque esta se refrescara antes de que llegue dicho valor, en este caso estamos retornando un string 'Success', en otras palabras el redirect en false funcionaria como un preventDefault() en los formularios, evita que se recargue la pagina para que el valor 'Success' llegue al formulario del login y se pueda realizar la redireccion desde el lado del cliente en el formulario
    await signIn('credentials', {
      ...Object.fromEntries(formData),
      redirect: false,
    })

    return 'Success'
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return 'Invalid credentials'
        default:
          return 'Something went wrong'
      }
    }
    throw error
  }
}

// Funcion que se ejecuta cuando se registra un usuario, para logearlo despues del registro
export const login = async (email: string, password: string) => {
  try {
    // Tomo el 'signIn' que estoy exportando desde el archivo 'auth.config.ts' y lo ejecuto
    await signIn('credentials', { email, password })

    return {
      ok: true,
    }
  } catch (error) {
    logger.error('Login error', error)

    return {
      ok: false,
      message: 'Login error',
    }
  }
}
