'use server'

import { type Product } from '@/interfaces'
import prisma from '@/lib/prisma'

export const getProductBySlug = async (
  slug: string
): Promise<Product | null> => {
  try {
    const product = await prisma.product.findFirst({
      include: {
        ProductImage: {
          select: {
            id: true,
            url: true,
          },
        },
      },
      where: {
        slug,
      },
    })

    if (!product) return null

    return {
      ...product,
      images: product.ProductImage.map((image) => image.url),
    }
  } catch (error) {
    throw new Error('Error to get product by slug')
  }
}
