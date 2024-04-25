'use server'

import z from 'zod'
import { GenderEnum } from '../../interfaces/product/product.interface'
import prisma from '@/lib/prisma'
import { Product, Size } from '@prisma/client'
import { logger } from '@/logs/winston.config'
import { revalidatePath } from 'next/cache'
import { v2 as cloudinary } from 'cloudinary'

// En cloudinary.config guardamos el URL que obtenemos en nuestro dashboard de cloudinary para que cloudinary sepa a donde tiene que subir las imagenes
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
      }

      // Proceso de carga y guardado de imagenes
      // formData.getAll('images') es un arreglo de archivos de tipo imagen
      if (formData.getAll('images')) {
        // uploadImages sube las imagenes a cloudinary y retorna un arreglo con las urls de cada imagen subida en cloudinary
        const images = await uploadImages(formData.getAll('images') as File[])

        if (!images) {
          throw new Error('Error uploading images, rollingback')
        }

        // Subimos las imagenes a nuestra base de datos de postgres
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
    // Recorrer las imagenes y guardarlas en cloudinary
    const uploadPromises = images.map(async (image) => {
      try {
        // Transformamos el archivo a un buffer
        const buffer = await image.arrayBuffer()
        // Convertimos el buffer a un string en base64
        const base64Image = Buffer.from(buffer).toString('base64')
        // Creo la promesa de subida de imagen a cloudinary pero no le agrego el 'await' porque sera ejecutada dentro de un Promise.all
        return (
          cloudinary.uploader
            .upload(`data:image/png;base64,${base64Image}`, {
              // 'next-teslo-shop' es la carpeta de mi upload preset en cloudinary: https://console.cloudinary.com/settings/c-b4aa3c08e0e0ef0edf809aa566ead4/upload_presets/0ad5af11f61882a7825660b4d0f7b726/edit
              folder: 'next-teslo-shop',
            })
            // result.secure_url es la url de la imagen que me creo cloudinary
            .then((result) => result.secure_url)
        )
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
