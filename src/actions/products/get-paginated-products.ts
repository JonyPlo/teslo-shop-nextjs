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

    include: {
      ProductImage: {
        take: 2,

        select: {
          url: true,
        },
      },
    },
  }

  try {
    const paginationPromises = await Promise.all([
      prisma.product.findMany(findPaginatedProducts),

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
