// Este es un archivo de definicion de Typescript

// Informacion obtenida en https://next-auth.js.org/getting-started/typescript

// Esta es la configuracion para cambiar el tipado del user que manejaremos en la aplicacion, por ejemplo si no configuramos esto, el objeto 'user' que obtenemos de la session tendra solo 3 propiedades (name, email, image) por lo tanto si ponemos algo como user.role nos marcara que 'role' es unknown, porque esa propiedad no existe en el objeto, asi que aqui re definimos el tipado del user para que Typescript reconozca esas otras propiedades

import NextAuth, { DefaultSession } from 'next-auth'

declare module 'next-auth' {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: {
      id: string
      name: string
      email: string
      emailVerify?: boolean
      role: string
      image?: string
    } & DefaultSession['user']
  }
}
