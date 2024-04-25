'use server'

import { type Product } from '@/interfaces'
import prisma from '@/lib/prisma'
import { logger } from '@/logs/winston.config'

export const getProductBySlug = async (
  slug: string
): Promise<Product | null> => {
  try {
    const product = await prisma.product.findFirst({
      include: {
        ProductImage: true,
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
  } catch (error: any) {
    logger.error('Error', error)

    throw new Error('Error to get product by slug')
  }
}
