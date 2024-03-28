'use server'

import { signIn } from '@/auth.config' // Tomo el 'signIn' que estoy exportando desde el archivo 'auth.config.ts' y lo ejecuto
import { AuthError } from 'next-auth'

export async function authenticate(
  prevState: string | undefined,
  formData: FormData
) {
  try {
    // El metodo 'signIn' recibe dos parametros: 'credentials' y 'formData', el 'credentials' es el metodo que viene del provider en el archivo 'auth.config.ts', si en el provider estuvieramos haciendo el login con google entonces en vez de 'credentials' deberia ser 'google', y el 'formData' es el objeto que contiene el email y password que recibimos del formulario de login
    // Si la promesa es exitosa entonces el metodo 'signIn' se encargara de iniciar sesion y actualizara el navegador con las credenciales automaticamente
    await signIn('credentials', formData)
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return 'Invalid credentials.'
        default:
          return 'Something went wrong.'
      }
    }
    throw error
  }
}
