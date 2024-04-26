'use server'

import z from 'zod'
import { GenderEnum } from '../../interfaces/product/product.interface'
import prisma from '@/lib/prisma'
import { Product, Size } from '@prisma/client'
import { logger } from '@/logs/winston.config'
import { revalidatePath } from 'next/cache'
import { v2 as cloudinary } from 'cloudinary'

cloudinary.config(process.env.CLOUDINARY_URL ?? '')

const productSchema = z.object({
  id: z.string().uuid().optional().nullable(),
  title: z
    .string()
    .min(3, { message: 'Title must contain at least 3 character(s)' })
    .max(255, { message: 'Title must contain at most 255 character(s)' }),
  slug: z
    .string()
    .min(3, { message: 'Slug must contain at least 3 character(s)' })
    .max(255, { message: 'Slug must contain at most 255 character(s)' }),
  description: z
    .string()
    .min(3, { message: 'Description must contain at least 3 character(s)' })
    .max(500, { message: 'Description must contain at most 500 character(s)' }),
  price: z.coerce
    .number()
    .nonnegative({ message: 'Price must be a positive number' })
    .min(0, { message: 'Minimum price is 0' })

    .transform((val) => Number(val.toFixed(2))),
  tags: z.string(),
  gender: z.nativeEnum(GenderEnum),
  categoryId: z.string().uuid(),
  sizes: z.coerce.string().transform((val) => val.split(',')),
  inStock: z.coerce
    .number()
    .nonnegative({ message: 'Price must be a positive number' })
    .min(0, { message: 'Minimum stock is 0' })
    .transform((val) => Number(val.toFixed(0))),
})

export const createUpdateProduct = async (formData: FormData) => {
  const data = Object.fromEntries(formData)
  const productParsed = productSchema.safeParse(data)

  if (!productParsed.success) {
    return {
      ok: false,
      message: productParsed.error.message,
    }
  }

  const product = productParsed.data
  product.slug = product.slug.toLowerCase().replace(/ /g, '-').trim()
  const { id, ...rest } = product

  try {
    const prismaTx = await prisma.$transaction(async (tx) => {
      let product: Product
      const tagsArray = rest.tags
        .split(',')
        .map((tag) => tag.trim().toLowerCase())

      if (id) {
        product = await prisma.product.update({
          where: { id },
          data: {
            ...rest,
            sizes: {
              set: rest.sizes as Size[],
            },
            tags: { set: tagsArray },
          },
        })
      } else {
        product = await prisma.product.create({
          data: {
            ...rest,
            sizes: {
              set: rest.sizes as Size[],
            },
            tags: { set: tagsArray },
          },
        })
      }

      if (formData.getAll('images')) {
        const images = await uploadImages(formData.getAll('images') as File[])

        if (!images) {
          throw new Error('Error uploading images, rollingback')
        }

        await prisma.productImage.createMany({
          data: images.map((image) => ({
            url: image!,
            productId: product.id,
          })),
        })
      }

      return {
        product,
      }
    })

    revalidatePath('/admin/products')
    revalidatePath(`/admin/product/${product.slug}`)
    revalidatePath(`/products/${product.slug}`)

    return {
      ok: true,
      message: 'Product updated/created',
      product: prismaTx.product,
    }
  } catch (error: any) {
    logger.error('Error', error)

    return {
      ok: false,
      message: error.message,
    }
  }
}

const uploadImages = async (images: File[]) => {
  try {
    const uploadPromises = images.map(async (image) => {
      try {
        const buffer = await image.arrayBuffer()

        const base64Image = Buffer.from(buffer).toString('base64')

        return cloudinary.uploader
          .upload(`data:image/png;base64,${base64Image}`, {
            folder: 'next-teslo-shop',
          })

          .then((result) => result.secure_url)
      } catch (error) {
        logger.error('Error', error)
        return null
      }
    })

    const uploadedImages = await Promise.all(uploadPromises)

    return uploadedImages
  } catch (error) {
    logger.error('Error', error)
    return null
  }
}
