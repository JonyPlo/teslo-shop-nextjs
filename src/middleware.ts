import NextAuth from 'next-auth'
import { authConfig } from './auth.config'

export default NextAuth(authConfig).auth

// Aquí estás inicializando NextAuth.js con el objeto authConfig y exportando la propiedad auth. También estás usando la opción matcher de Middleware para especificar que debe ejecutarse en rutas específicas.

//La ventaja de emplear Middleware para esta tarea es que las rutas protegidas ni siquiera comenzarán a renderizarse hasta que el Middleware verifique la autenticación, mejorando tanto la seguridad como el rendimiento de tu aplicación.

// En otras palabras, esta configuración especifica que los middlewares como authorized, jwt y session en el archivo auth.config.ts deben ejecutarse en todas las rutas excepto las que comienzan con /api, /_next/static, /_next/image, o cualquier ruta que termine con .png o .ico
export const config = {
  // https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$|favicon\\.ico).*)'],
}
