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

            // Dentro de un select, los campos que son relaciones como por ejemplo en este caso el campo 'product' nos permite hacer mas selecciones dentro de esa relacion
            // En este caso estamos diciendo que dentro de 'OrderItems' seleccione solo algunos campos, y del 'product' que esta relacionado con este OrderItem, necesito tambien seleccionar solo algunos campos
            product: {
              select: {
                title: true,
                slug: true,

                ProductImage: {
                  select: {
                    url: true,
                  },
                  // ProductImage, es un arreglo de objetos, el cual estoy pidiendo que cada objeto tenga un apropiedad 'url' con la url de cada imagen, pero si queremos tomar solo una imagen de ese arreglo lo podemos hacer con 'take: 1'
                  take: 1,
                },
              },
            },
          },
        },
      },
    })

    // Verificar si la orden no existe
    if (!order) throw new Error('Order not exist')

    // Verifico si el usuario logueado no es un admin y el order que obtuvimos pertenece a otro usuario entonces retornamos un error
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
