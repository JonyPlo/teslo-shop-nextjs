'use server'

import prisma from '@/lib/prisma'
import { Gender } from '@prisma/client'

interface PaginationOptions {
  page?: number
  take?: number
  gender?: Gender
}

export const getPaginatedProductsWithImages = async ({
  page = 1,
  take = 12,
  gender,
}: PaginationOptions) => {
  if (isNaN(Number(page))) page = 1
  if (page < 1) page = 1

  const findPaginatedProducts = {
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
    take,
    skip: (page - 1) * take,
    where: {
      gender,
    },
  }

  try {
    const paginationPromises = await Promise.all([
      // 1. Obtengo los productos
      prisma.product.findMany(findPaginatedProducts),
      // 2. Obtengo el total de paginas
      // Con el metodo .count() puedo obtener un numero que me indique la cantidad de items que tiene la tabla de products, y si enviamos un objeto vacio como argumento estamos diciendo que cuente todos los productos
      prisma.product.count({ where: { gender } }),
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
      limit: take,
      totalPages,
      products,
    }
  } catch (error) {
    throw new Error('Something went wrong')
  }
}
