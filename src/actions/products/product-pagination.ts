'use server'

import prisma from '@/lib/prisma'

export const getPaginatedProductsWithImages = async () => {
  try {
    const products = await prisma.product.findMany({
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

    console.log(products)

    return {
      currentPage: 1,
      totalPages: 10,
      products: products.map((product) => ({
        ...product,
        images: product.ProductImage.map((image) => image.url),
      })),
    }
  } catch (error) {
    throw new Error('Unable to charge products')
  }
}
