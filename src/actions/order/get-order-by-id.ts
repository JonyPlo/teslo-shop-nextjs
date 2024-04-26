'use server'

import { auth } from '@/auth.config'
import prisma from '@/lib/prisma'
import { logger } from '@/logs/winston.config'

export const getOrderById = async (id: string) => {
  try {
    const session = await auth()

    if (!session?.user) {
      return {
        ok: false,
        message: 'The user must be authenticated',
      }
    }

    const order = await prisma.order.findFirst({
      where: {
        id,
      },

      include: {
        OrderAddress: {
          select: {
            firstName: true,
            lastName: true,
            address: true,
            address2: true,
            city: true,
            postalCode: true,
            telephone: true,

            country: {
              select: {
                name: true,
              },
            },
          },
        },
        OrderItem: {
          select: {
            price: true,
            quantity: true,
            size: true,

            product: {
              select: {
                title: true,
                slug: true,

                ProductImage: {
                  select: {
                    url: true,
                  },

                  take: 1,
                },
              },
            },
          },
        },
      },
    })

    if (!order) throw new Error('Order not exist')

    if (session.user.role === 'user' && session.user.id !== order?.userId)
      throw new Error('You do not have privileges to view this order')

    const { OrderAddress, OrderItem, ...orderRest } = order

    const orderAddress = OrderAddress
    const orderSummary = orderRest

    const adaptOrderItems = OrderItem.map((item) => {
      const { product, ...restItem } = item
      const { ProductImage, ...restProduct } = product

      return {
        ...restItem,
        ...restProduct,
        image: ProductImage[0].url,
      }
    })

    return {
      ok: true,
      orderAddress,
      orderSummary,
      orderItems: adaptOrderItems,
    }
  } catch (error: any) {
    logger.error('Error getting order summary', error)

    return {
      ok: false,
      message: error?.message,
    }
  }
}
