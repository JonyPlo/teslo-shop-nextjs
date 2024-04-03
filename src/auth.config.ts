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

  // Los callbacks son middlewares que se ejecutaran en un cierto punto del ciclo de vida de la autenticación de un usuario, en otras palabras, despues de que la autenticación pase por algún proveedor, se van a ejecutar los callbacks  antes de mostrar la informacion de la sesion en la pagina
  callbacks: {
    // El middleware authorized se invoca cuando un usuario necesita autorización, utilizando, en otras palabras, se ejecuta siempre que el usuario ingresa a una ruta, y ejecuta una accion dependiendo si el usuario esta autenticado o no, este middleware recibira 2 parametros, el primero es el 'auth' que es un objeto con los datos del usuario autenticado, y si no esta autenticado entonces null, y el segundo argumento es 'request' que es un objeto con varias propiedades pero la que necesitamos es la propiedad 'nextUrl' que es un objeto URL con todas las propiedades de una url, con este nextUrl podemos obtener datos de la url mientras el user navega por las paginas
    authorized({ auth, request: { nextUrl } }) {
      // Verificamos si el usuario esta autenticado o no
      const isLoggedIn = !!auth?.user

      //* Definimos cuales son las rutas que necesitan que el usuario este autenticado para poder acceder a ellas
      const authenticatedRoutes = ['/checkout', '/checkout/address']

      // Verificamos si la ruta en la qu estamos actualmente en la pagina coincide con alguna de las rutas protegidas, si coincide entonces isProtected es true, de lo contrario sera false
      const isProtected = authenticatedRoutes.some((path) =>
        nextUrl.pathname.startsWith(path)
      )

      // Por ultimo, verificamos si la ruta a la que queremos acceder esta protegida, es decir, si requiere que el usuario este autenticado, pero a la vez el usuario NO esta autenticado entonces se ejecuta esta condicion
      if (isProtected && !isLoggedIn) {
        // Construimos la ruta a la que el usuario no autenticado sera redireccionado, en este caso la url sera por ejemplo 'http://localhost:3000/auth/login'
        const redirectUrl = new URL('/auth/login', nextUrl.origin)
        // Ahora ANTES de redireccionar al usuario a la ruta 'http://localhost:3000/auth/login' agregamos un query parameter llamado 'redirectTo' y como valor la ruta protegida a la que el usuario quiso acceder pero no pudo, el flujo seria el siguiente, el usuario quiere acceder por ejemplo a la ruta '/checkout/address' pero al ser una ruta protegida sera redireccionado al login, pero ANTES de redireccionarlo al login, agregaremos un query parameter a la url del login con la ruta '/checkout/address' (http://localhost:3000/auth/login?redirectTo=/checkout/address) para despues desde el formulario del login tomemos ese query parameter y asi cuando el usuario inicie sesion, hacer que vuelva a la misma ruta en donde estaba antes. La logica para redireccionar al usuario con el redirectTo esta en el componente LoginForm.tsx
        redirectUrl.searchParams.append('redirectTo', nextUrl.pathname)
        return Response.redirect(redirectUrl)
      }

      return true
    },

    // Por defecto el parametro 'token' es un objeto que tiene informacion de la session, que es un objeton con las propiedades name, email, picture y sub, (sub seria el id del usuario), y esa es la informacion que se pasa a la sesion para poder usarla en la pagina, pero si queremos agrandar ese objeto con mas propiedades como por ejemplo el role, emailVerified, etc. tenemos que usar el parametro 'user'
    //* El parametro 'user' tiene la misma informacion que el objeto 'rest' que se retorna al final de este archivo, recordar que el objeto rest tiene toda la informacion del usuario porque cuando se realiza la autenticacion, toda esa informacion del usuario que obtenemos de la base de datos se guarda en ese objeto rest, asi que solo tenemos que sacar esa informacion que nos falta del parametro 'user' y pasarsela al objeto 'token'
    //* Tener en cuenta que el token que se obtiene es el que se almacena en las cookies del navegador
    //* Este metodo se ejecuta antes del metodo session()
    //* El metodo token siempre debe retornar un token
    jwt({ token, user }) {
      if (user) {
        // Aqui estamos creando una propiedad llamada 'data' en el objeto del token, y almacenando el objeto 'user' con toda la informacion del usuario almacenado en la base de datos
        token.data = user
      }

      return token
    },

    // El trabajo del metodo session() es obtener la informacion de la session modificada y retornarla
    //* Este metodo se ejecuta despues del metodo jwt()
    //* El metodo session siempre debe retornar un session
    session({ session, token, user }) {
      session.user = token.data as any

      return session
    },
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
        return rest
      },
    }),
  ],
}

//* Al metodo 'handlers' lo usaremos dentro de la ruta 'app/api/auth/[...nextauth]/route.ts' que es el que contiene los metodos GET y POST para realizar las peticiones http que el SessionProvider esta buscando, el SessionProvider es un proveedor de nextauth que estamos usando en el componente '<Provider />' en la ruta 'src/components/provider/Provider.tsx'
export const { signIn, signOut, auth, handlers } = NextAuth(authConfig)
