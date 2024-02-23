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

  try {
    const products = await prisma.product.findMany({
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
    })

    return {
      // Pagination
      currentPage: 1,
      totalPages: 10,

      // Products
      products: products.map((product) => {
        const { ProductImage, ...rest } = product

        const productModify = {
          ...rest,
          images: ProductImage.map((image) => image.url),
        }

        return productModify
      }),
    }
  } catch (error) {
    throw new Error('Unable to get products')
  }
}
