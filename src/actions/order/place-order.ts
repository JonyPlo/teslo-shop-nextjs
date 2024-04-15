'use server'

import { auth } from '@/auth.config'
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

  // Verificar sesion de usuario
  if (!userId) throw new Error('User session not found')

  try {
    // Obtener la informacion de los productos en la db
    // Recorder que podemos llevar 2 o mas productos con el mismo ID
    const dbProducts = await prisma.product.findMany({
      where: {
        id: {
          // La propiedad 'in' necesita un arreglo de strings para poder relizar la busqueda de cada uno, por ejemplo aqui le estamos pasando un arreglo con los ids de los productos que estan en el carrito del local storage, por lo tanto buscara en la base de datos todos aquellos productos que tengan el mismo id
          in: productsInCart.map((product) => product.productId),
        },
      },
    })

    // Calcular la cantidad de items a comprar
    const itemsInOrder = productsInCart.reduce(
      (acc, product) => acc + product.quantity,
      0
    )

    // Calcular el subtotal, taxes y total
    const { subTotal, tax, total } = productsInCart.reduce(
      (totals, cartProduct) => {
        const productQuantity = cartProduct.quantity
        const product = dbProducts.find(
          (dbProduct) => dbProduct.id === cartProduct.productId
        )

        if (!product) throw new Error(`${cartProduct.productId} not found`)

        const subTotal = product.price * productQuantity

        totals.subTotal += subTotal
        totals.tax += subTotal * 1
        totals.total += subTotal * 2

        return totals
      },
      { subTotal: 0, tax: 0, total: 0 }
    )

    // Crear la transaccion de base de datos
    // Aqui realizamos una transaccion con prisma, y en lugar de trabajar directamente con prisma usaremos 'tx' (tx hace referencia a la palabra 'transaction') que tiene acceso a todos los mismos objetos que tiene prisma, y a medida que se va avanzando tx va almacenando en memoria todos los pasos sin afectar a la base de datos, y solo si se completaron todos de manera exitosa, entonces se retornaran todos los pasos y ahora si estos afectaran a la base de datos, pero si en el medio del proceso, en algun paso hubo un error, como por ejemplo el stock de un producto en la base de datos bajo a 0, entonces lanzamos un error y tx realizara un rollback para cancelar lo que se hizo en los pasos anteriores por nosotros
    //! IMPORTANTE: dentro del metodo $transaction() no podemos utilizar prisma de la siguiente forma 'prisma.order.find()...' si no que vamos a usar el elemento 'tx', por ejemplo 'tx.order.find()...'
    const prismaTx = await prisma.$transaction(async (tx) => {
      //* 1. Actualizar el stock de los productos
      // Dentro de este map vamos a construir un arreglo de promesas para luego ejecutar todas juntas con el Promise.all.
      // La idea de realizar este arreglo es actualizar el stock de los productos en la db, ya que como estamos comprando items, el stock de cada producto deberia restarse
      const updateProductPromises = dbProducts.map((dbProduct) => {
        // Acumulamos o sumamos la cantidad de productos a ordenar
        const cartProductQuantity = productsInCart
          .filter((cartProduct) => cartProduct.productId === dbProduct.id)
          .reduce((acc, item) => item.quantity + acc, 0)

        // Solo entrariamos a este if si se manipulo la cantidad de items desde la db
        if (cartProductQuantity === 0) {
          throw new Error(`${dbProduct.id} does not have quantity`)
        }

        return tx.product.update({
          where: {
            id: dbProduct.id,
          },
          data: {
            //! inStock: dbProduct.inStock - cartProductQuantity // <- No hacer esta forma para restar valores, en este caso del stock, porque en un punto de la ejecucion dbProduct.inStock ya es un valor viejo, ya que mientras se realiza toda esta operacion, otra persona en el mismo momento pudo haber comprado los mismos productos, lo cual actualizaria el stock del o los productos en la base de datos y eso haria que ahora dbProduct.inStock ya tenga un valor viejo que no es el actualizado, por lo tanto esto podria restar el stock, caer en numeros negativos, etc.
            // Esta es la forma correcta de decrementar un valor y es usando la propiedad 'decrement' que ya nos ofrece prisma, y lo que hace es que cuando se ejecute el update del producto, se fijara de cuanto es el stock en ese momento en la base de datos y cuando tenga esa informacion recien restara o decrementara el valor que le pasamos.
            // Tener en cuenta que 'decrement' igual nos hace caer en valores negativos si es que ordenamos mas productos de los que hay en stock, asi que en este caso deberemos realizar un rollback
            //Recordar que tambien tenemos la propiedad 'increment' para incrementar valores.
            inStock: {
              decrement: cartProductQuantity,
            },
          },
        })
      })

      // Dentro de updatedProducts se guardara un arreglo con los productos que actualizamos
      const updatedProducts = await Promise.all(updateProductPromises)

      // Verificar valores negativos en el stock de los productos
      updatedProducts.forEach((prod) => {
        // Si esta condicional es true, se realizara un rollback y se cancelara todo el proceso que se realizo antes.
        if (prod.inStock < 0)
          throw new Error(`${prod.title} does not have sufficient stock`)
      })

      //* 2. Crear la orden -  Encabezado y Detalle
      const order = await tx.order.create({
        data: {
          userId,
          itemsInOrder,
          subTotal,
          tax,
          total,

          // Como la tabla 'Order' tiene una relacion con la tabla 'OrderItem', entonces aqui mismo podemos hacer la incersion de los items en la tabla OrderItem
          // Un OrderItem requiere una propiedad llamada 'orderId', pero en este caso prisma se encargara de crear esa propiedad por nosotros, ya que primero crea la orden, y una vez creada toma el id que le creo la base de datos para esa orden y lo guarda dentro de la propiedad orderId en cada item de la tabla OrderItem
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

      //* 3. Crear la direccion de la orden
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
