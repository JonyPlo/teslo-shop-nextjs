'use server'

import prisma from '@/lib/prisma'
import { sleep } from '@/utils'

export const getStockBySlug = async (slug: string): Promise<number> => {
  await sleep(2)
  try {
    const stock = await prisma.product.findFirst({
      where: { slug },
      select: { inStock: true },
    })

    return stock?.inStock ?? 0
  } catch (error) {
    throw new Error('Product stock not found')
  }
}
