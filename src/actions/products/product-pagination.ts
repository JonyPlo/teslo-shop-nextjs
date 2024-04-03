'use server'

import { type PaginatedProductsResult } from '@/interfaces'
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
}: PaginationOptions): Promise<PaginatedProductsResult> => {
  if (isNaN(Number(page))) page = 1
  if (page < 1) page = 1

  const findPaginatedProducts = {
    where: {
      gender,
    },
    take,
    skip: (page - 1) * take,
    // Con include estoy diciendo que el objeto que me devuelve, incluya una propiedad con valores de otra tabla
    include: {
      // Y aquí pido que incluya el ProductImage, en otras palabras, buscar en la tabla de ProductImage, las imágenes que estén relacionadas con cada producto.
      // Esto hará que se cree una propiedad llamada ProductImage en el objeto de cada producto, y esta propiedad tendrá un arreglo con las imágenes de ese producto
      ProductImage: {
        // Con take pido que solo traiga 2 imágenes por producto
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
      // Con el método .count() puedo obtener un numero que me indique la cantidad de items que tiene la tabla de products, y si enviamos un objeto vació como argumento estamos diciendo que cuente todos los productos
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
