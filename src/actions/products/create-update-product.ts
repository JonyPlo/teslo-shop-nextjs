'use server'

import z from 'zod'
import { GenderEnum } from '../../interfaces/product/product.interface'

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
  console.log(formData)

  const data = Object.fromEntries(formData)
  const productParsed = productSchema.safeParse(data)

  if (!productParsed.success) {
    console.log(productParsed.error)
    return {
      ok: false,
      message: productParsed.error.message,
    }
  }
  console.log(productParsed.data)

  return {
    ok: true,
  }
}
