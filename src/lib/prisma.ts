// Configuracion sacada de https://www.prisma.io/docs/orm/more/help-and-troubleshooting/help-articles/nextjs-prisma-client-dev-practices

import { PrismaClient } from '@prisma/client'

let prisma: PrismaClient

// Hemos declarado explícitamente que 'global' tiene una propiedad opcional llamada prisma de tipo PrismaClient.
// Esto le dice a TypeScript que global.prisma puede existir y que su tipo es PrismaClient.
//* Esta opcion no viene en la configuracion de next, asi que la agregue yo para que funcione
declare const global: {
  prisma?: PrismaClient
}

if (process.env.NODE_ENV === 'production') {
  prisma = new PrismaClient()
} else {
  if (!global.prisma) {
    global.prisma = new PrismaClient()
  }
  prisma = global.prisma
}

export default prisma
