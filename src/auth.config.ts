import NextAuth, { type NextAuthConfig } from 'next-auth'
import credentials from 'next-auth/providers/credentials'
import { z } from 'zod'
import prisma from '@/lib/prisma'
import bcrypt from 'bcryptjs'

//* Configuracion para inicio de sesion y registro en paginas custom

export const authConfig: NextAuthConfig = {
  // En la propiedad 'pages' pondremos la ruta a la que accedemos para iniciar secion y para registrarse, por ejemplo localmente el path de la pagina de inicio de sesion es "http://localhost:3000/auth/login" por lo tanto el path que tengo que agregar en la propiedad "signIn" es "/auth/login"
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

        // Comprobar si el email existe en la db
        const user = await prisma.user.findUnique({
          where: { email: email.toLowerCase() },
        })

        if (!user) return null

        // Comparar los passwords
        const passwordMatch = bcrypt.compareSync(password, user.password)

        if (!passwordMatch) return null

        // Si llegamos hasta aqui quiere decir que la persona ya esta autenticada, asi que quitamos el password del objeto 'user' porque ya no lo necesitamos
        const { password: _, ...rest } = user

        // Por ultimo retornamos el objeto 'rest' que seria el objeto 'user' pero sin el password, y este objeto contiene la informacion necesaria que va a pasar a los diferentes callbacks de NextAuth para obtener la informacion de la persona autenticada en cualquier parte de la aplicacion
        console.log({ rest })

        return rest
      },
    }),
  ],
}

//* Al metodo 'handlers' lo usaremos dentro de la ruta 'app/api/auth/[...nextauth]/route.ts' que es el que contiene los metodos GET y POST para realizar las peticiones http que el SessionProvider esta buscando, el SessionProvider es un proveedor de nextauth que estamos usando en el componente '<Provider />' en la ruta 'src/components/provider/Provider.tsx'
export const { signIn, signOut, auth, handlers } = NextAuth(authConfig)
