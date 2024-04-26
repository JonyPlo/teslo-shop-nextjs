'use server'

import { auth } from '@/auth.config'
import { TAX_MOUNT, TAX_MOUNT_WITH_SUBTOTAL } from '@/components'
import type { Address, Size } from '@/interfaces'
import prisma from '@/lib/prisma'
import { logger } from '@/logs/winston.config'

interface ProductToOrder {
  productId: string
  quantity: number
  size: Size
}

export const placeOrder = async (
  productsInCart: ProductToOrder[],
  address: Address
) => {
  const session = await auth()
  const userId = session?.user.id

  if (!userId) throw new Error('User session not found')

  try {
    const dbProducts = await prisma.product.findMany({
      where: {
        id: {
          in: productsInCart.map((product) => product.productId),
        },
      },
    })

    const itemsInOrder = productsInCart.reduce(
      (acc, product) => acc + product.quantity,
      0
    )

    const { subTotal, tax, total } = productsInCart.reduce(
      (totals, cartProduct) => {
        const productQuantity = cartProduct.quantity
        const product = dbProducts.find(
          (dbProduct) => dbProduct.id === cartProduct.productId
        )

        if (!product) throw new Error(`${cartProduct.productId} not found`)

        const subTotal = product.price * productQuantity

        totals.subTotal += subTotal
        totals.tax += subTotal * TAX_MOUNT
        totals.total += subTotal * TAX_MOUNT_WITH_SUBTOTAL

        return totals
      },
      { subTotal: 0, tax: 0, total: 0 }
    )

    const prismaTx = await prisma.$transaction(async (tx) => {
      const updateProductPromises = dbProducts.map((dbProduct) => {
        const cartProductQuantity = productsInCart
          .filter((cartProduct) => cartProduct.productId === dbProduct.id)
          .reduce((acc, item) => item.quantity + acc, 0)

        if (cartProductQuantity === 0) {
          throw new Error(`${dbProduct.id} does not have quantity`)
        }

        return tx.product.update({
          where: {
            id: dbProduct.id,
          },
          data: {
            inStock: {
              decrement: cartProductQuantity,
            },
          },
        })
      })

      const updatedProducts = await Promise.all(updateProductPromises)

      updatedProducts.forEach((prod) => {
        if (prod.inStock < 0)
          throw new Error(`${prod.title} does not have sufficient stock`)
      })

      const order = await tx.order.create({
        data: {
          userId,
          itemsInOrder,
          subTotal,
          tax,
          total,

          OrderItem: {
            createMany: {
              data: productsInCart.map((cartProd) => ({
                quantity: cartProd.quantity,
                size: cartProd.size,
                productId: cartProd.productId,
                price:
                  dbProducts.find((dbProd) => dbProd.id === cartProd.productId)
                    ?.price ?? 0,
              })),
            },
          },
        },
      })

      const { country, ...restAddress } = address

      const orderAddress = await tx.orderAddress.create({
        data: {
          ...restAddress,
          countryId: country,
          orderId: order.id,
        },
      })

      return {
        updatedProducts,
        order,
        orderAddress,
      }
    })

    return {
      ok: true,
      order: prismaTx.order,
      prismaTx,
    }
  } catch (error: any) {
    logger.error('Error to save Order', error)

    return {
      ok: false,
      message: error?.message,
    }
  }
}
