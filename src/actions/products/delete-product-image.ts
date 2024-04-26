'use server'

import prisma from '@/lib/prisma'
import { logger } from '@/logs/winston.config'
import { v2 as cloudinary } from 'cloudinary'
import { revalidatePath } from 'next/cache'

export const deleteProductImage = async (imageId: number, imageUrl: string) => {
  if (!imageUrl.startsWith('http'))
    throw new Error('Cannot delete images from the file system')

  const imageName = imageUrl.split('/').pop()?.split('.')[0] ?? ''

  try {
    await cloudinary.uploader.destroy(`next-teslo-shop/${imageName}`)

    const deletedImage = await prisma.productImage.delete({
      where: {
        id: imageId,
      },

      select: {
        product: {
          select: {
            slug: true,
          },
        },
      },
    })

    revalidatePath('/admin/products')
    revalidatePath(`/admin/product/${deletedImage.product.slug}`)
    revalidatePath(`/product/${deletedImage.product.slug}`)

    return {}
  } catch (error: any) {
    logger.error('Error', error)

    return {
      ok: false,
      message: error.message,
    }
  }
}
