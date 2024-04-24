'use server'

import z from 'zod'
import { GenderEnum } from '../../interfaces/product/product.interface'
import prisma from '@/lib/prisma'
import { Product, Size } from '@prisma/client'
import { logger } from '@/logs/winston.config'

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
    // Con el metodo 'transform' tomamos el valor del input y lo pasamos a otro valor que necesitemos, en este caso el campo 'price' llega como string pero necesitamos transformarlo a un number
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

  console.log(productParsed)

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
    // En este caso usamos una transaccion de prisma porque tenemos que dar de alta el producto en la base de datos pero tambien las imagenes en cloudinary, asi que como son 2 bases de datos diferentes usamos la transaccion por si el alta de una de las 2 cosas falla entonces se realice el rollback para cancelar todo
    const prismaTx = await prisma.$transaction(async (tx) => {
      let product: Product
      const tagsArray = rest.tags
        .split(',')
        .map((tag) => tag.trim().toLowerCase())

      // Si el producto tiene un 'id' quiere decir que el producto ya existe en la base de datos y tenemos que actualizarlo, pero si no tiene un id, entonces tenemos que crear el producto
      if (id) {
        product = await prisma.product.update({
          where: { id },
          data: {
            ...rest,
            sizes: {
              // Con la propiedad 'set' estamos indicando que lo que guardamos en el campo sizes tiene que ser un set de datos, entonces originalmente 'sizes' es un array de strings, pero lo convertira en un set de datos para poder guardarlo y en la db se vera de la siguiente forma: {XS,S,XL,XXL,L,M}
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
        console.log({ product })
      }

      return {
        product,
      }
    })

    return {
      ok: true,
    }
  } catch (error: any) {
    logger.error('Error', error)

    return {
      ok: false,
      message: error.message,
    }
  }
}
