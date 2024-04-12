'use server'

import { auth } from "@/auth.config"
import type { Address, Size } from "@/interfaces"
import prisma from "@/lib/prisma"
import { logger } from "@/logs/winston.config"

interface ProductToOrder {
  productId: string
  quantity: number
  size: Size
}

export const placeOrder = async (productIds: ProductToOrder[], address: Address) => {


  const session = await auth()
  const userId = session?.user.id

  // Verificar sesion de usuario
  if (!userId) {
    return {
      ok: false,
      message: 'User session not found'
    }
  }


  try {

    // Obtener la informacion de los productos en la db
    // Recorder que podemos llevar 2 o mas productos con el mismo ID
    const dbProducts = await prisma.product.findMany({
      where: {
        id: {
          // La propiedad 'in' necesita un arreglo de strings para poder relizar la busqueda de cada uno, por ejemplo aqui le estamos pasando un arreglo con los ids de los productos que estan en el carrito del local storage, por lo tanto buscara en la base de datos todos aquellos productos que tengan el mismo id
          in: productIds.map(product => product.productId)
        }
      }
    })

    // Calcular los montos
    const itemsInOrder = productIds.reduce((acc, product) => acc + product.quantity, 0)

    // Calcular el subtotal, taxes y total
    const {subTotal,tax,total } = productIds.reduce((totals, cartProduct) => {

      const productQuantity = cartProduct.quantity
      const product = dbProducts.find(dbProduct => dbProduct.id === cartProduct.productId)

      if (!product) throw new Error(`${cartProduct.productId} not found`)

      const subTotal = product.price * productQuantity

      totals.subTotal += subTotal
      totals.tax += subTotal * 1
      totals.total += subTotal * 2

      return totals


    }, { subTotal: 0, tax: 0, total: 0 })


} catch (error) {
  logger.error('Error to save Order', error)
}


}
