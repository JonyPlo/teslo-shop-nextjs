import NextAuth, { type NextAuthConfig } from 'next-auth'
import credentials from 'next-auth/providers/credentials'
import { z } from 'zod'
import prisma from '@/lib/prisma'
import bcrypt from 'bcryptjs'

export const authConfig: NextAuthConfig = {
  pages: {
    signIn: '/auth/login',
    newUser: '/auth/new-account',
  },

  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = Boolean(auth?.user)

      const protectedPaths = [
        '/checkout',
        '/checkout/address',
        '/profile',
        '/orders',
        '/orders/:id',
      ]
      const authPaths = ['/auth/login', '/auth/new-account']
      const adminProtectedPaths = ['/admin', '/admin/orders', '/admin/users']

      const isProtectedPath = protectedPaths.some((path) =>
        nextUrl.pathname.startsWith(path)
      )

      const isAuthPath = authPaths.some((path) =>
        nextUrl.pathname.startsWith(path)
      )

      const isAdminPath = adminProtectedPaths.some((path) =>
        nextUrl.pathname.startsWith(path)
      )

      if (isProtectedPath && !isLoggedIn) {
        const redirectUrl = new URL('/auth/login', nextUrl.origin)

        redirectUrl.searchParams.append('redirectTo', nextUrl.pathname)
        return Response.redirect(redirectUrl)
      }

      if (isAuthPath && isLoggedIn) {
        const redirectUrl = new URL('/', nextUrl.origin)
        return Response.redirect(redirectUrl)
      }

      if (isAdminPath && auth?.user.role !== 'admin') {
        const redirectUrl = new URL('/', nextUrl.origin)
        return Response.redirect(redirectUrl)
      }

      return true
    },

    jwt({ token, user }) {
      if (user) {
        token.data = user
      }

      return token
    },

    session({ session, token, user }) {
      session.user = token.data as any

      return session
    },
  },

  providers: [
    credentials({
      async authorize(credentials) {
        const parsedCredentials = z
          .object({ email: z.string().email(), password: z.string().min(6) })
          .safeParse(credentials)

        if (!parsedCredentials.success) return null

        const { email, password } = parsedCredentials.data

        const user = await prisma.user.findUnique({
          where: { email: email.toLowerCase() },
        })

        if (!user) return null

        const passwordMatch = bcrypt.compareSync(password, user.password)

        if (!passwordMatch) return null

        const { password: _, ...rest } = user

        return rest
      },
    }),
  ],
}

export const { signIn, signOut, auth, handlers } = NextAuth(authConfig)
