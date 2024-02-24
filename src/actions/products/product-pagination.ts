'use server'

import prisma from '@/lib/prisma'

interface PaginationOptions {
  page?: number
  take?: number
}

export const getPaginatedProductsWithImages = async ({
  page = 1,
  take = 12,
}: PaginationOptions) => {
  if (isNaN(Number(page))) page = 1
  if (page < 1) page = 1

  const findPaginatedProducts = {
    take,
    skip: (page - 1) * take,
    // Con include estoy filtrando la búsqueda de productos
    include: {
      // Y aqui pido que incluya el ProductImage, en otras palabras, buscar en la tabla de ProductImage, las imagenes que esten relacionadas con cada producto.
      // Esto hara que se cree una propiedad llamada ProductImage en el objeto de cada producto, y esta propiedad tendra un arreglo con las imagenes de ese producto
      ProductImage: {
        // Con take pido que solo traiga 2 imagenes por producto
        take: 2,
        //  Con select digo que solo necesito la propiedad "url" de cada imagen, ya que una imagen tiene varias propiedades en la tabla
        select: {
          url: true,
        },
      },
    },
  }

  try {
    const paginationPromises = await Promise.all([
      // 1. Obtengo los productos
      prisma.product.findMany(findPaginatedProducts),
      // 2. Obtengo el total de paginas
      // Con el metodo .count() puedo obtener un numero que me indique la cantidad de items que tiene la tabla de products, y si enviamos un objeto vacio como argumento estamos diciendo que cuente todos los productos
      prisma.product.count({}),
    ])

    const [paginatedProducts, countProducts] = paginationPromises
    const totalPages = Math.ceil(countProducts / take)

    const products = paginatedProducts.map((product) => {
      const { ProductImage, ...rest } = product
      return {
        ...rest,
        images: ProductImage.map((image) => image.url),
      }
    })

    return {
      currentPage: page,
      totalPages,
      products,
    }
  } catch (error) {
    throw new Error('Unable to get products')
  }
}
