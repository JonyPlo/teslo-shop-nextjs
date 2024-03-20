import NextAuth, { type NextAuthConfig } from 'next-auth'
import credentials from 'next-auth/providers/credentials'
import { z } from 'zod'

//* Configuracion para inicio de sesion y registro en paginas custom

export const authConfig: NextAuthConfig = {
  // En la propiedad pages pondremos la ruta a la que accedemos para iniciar secion y para registrarse, por ejemplo localmente el path de la pagina de inicio de sesion es "http://localhost:3000/auth/login" por lo tanto el path que tengo que agregar en la propiedad "signIn" es "/auth/login"
  pages: {
    signIn: '/auth/login',
    newUser: '/auth/new-account',
  },

  // En providers almacenamos los proveedores de inicio de sesion etc, en ese caso usaremos el metodo "credentials" porque vamos a realizar un login/register custom, no usaremos Google, GitHub, etc.
  providers: [
    // En el metodo credentials
    credentials({
      async authorize(credentials) {
        // El objeto zod se encargara de validar el objeto que contiene el email y password, y si no se cumplen con las especificaciones, zod retorna null
        const parsedCredentials = z
          .object({ email: z.string().email(), password: z.string().min(6) })
          .safeParse(credentials)

        // Aqui nos aseguramos de que si parsedCredentials.success no tiene un objeto entonces retornara null
        if (!parsedCredentials.success) return null

        // Si las validaciones salen bien y tenemos el objeto entonces desestructuramos el objeto para obtener el email y password
        const { email, password } = parsedCredentials.data

        console.log({ email, password })

        // Buscar el correo

        // Comparar los passwords

        // Regresar el user

        return null
      },
    }),
  ],
}

export const { signIn, signOut, auth } = NextAuth(authConfig)
