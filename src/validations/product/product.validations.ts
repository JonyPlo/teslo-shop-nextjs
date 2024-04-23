import z from 'zod'

const REGEX = {
  TITLE: /^[A-Za-z0-9\s'?]*$/,
  SLUG: /^[a-zA-Z0-9_-]*$/,
  DESCRIPTION: /^[\s\S]*$/,
  PRICE: /^[0-9]*$/,
  INSTOCK: /^[0-9]*$/,
  SIZES: /^[A-Za-z\s?]*$/,
  TAGS: /^[A-Za-z\s?]*$/,
  GENDER: /^[A-Za-z\s?]*$/,
  CATEGORYID: /^[a-zA-Z0-9-]*$/,
}

export const productSchema = z.object({
  title: z
    .string()
    .min(3, { message: 'Title must contain at least 3 character(s)' })
    .max(100, { message: 'Title must contain at most 30 character(s)' })
    .regex(REGEX.TITLE, { message: 'Title must be a string only' }),
  slug: z
    .string()
    .min(3, { message: 'Slug must contain at least 3 character(s)' })
    .max(150, { message: 'Slug must contain at most 30 character(s)' })
    .regex(REGEX.SLUG, { message: 'Slug must be a string only' }),
  description: z
    .string()
    .min(3, { message: 'Description must contain at least 3 character(s)' })
    .max(500, { message: 'Description must contain at most 100 character(s)' })
    .regex(REGEX.DESCRIPTION, { message: 'Description must be a string only' }),
  price: z
    .number()
    .nonnegative({ message: 'Price must be a positive number' })
    .min(20, { message: 'Minimum price is 20' })
    .max(10000, { message: 'Maximum price is 10.000' }),
  inStock: z
    .number()
    .nonnegative({ message: 'Price must be a positive number' })
    .min(1, { message: 'Minimum stock is 1' })
    .max(10000, { message: 'Maximum stock is 10.000' }),
  // Con z.array(z.string()) estoy definiendo que este campo tiene que ser un arreglo de strings - string[]
  sizes: z.array(
    z
      .string()
      .min(3, { message: 'Sizes must contain at least 3 character(s)' })
      .max(30, { message: 'Sizes must contain at most 30 character(s)' })
      .regex(REGEX.SIZES, { message: 'Sizes must be a string only' })
  ),
  tags: z.string().regex(REGEX.TAGS, { message: 'Tags must be string only' }),
  gender: z.enum(['men', 'women', 'kid', 'unisex']),
  categoryId: z
    .string()
    .regex(REGEX.CATEGORYID, { message: 'CategoryId must be a string only' }),
})

export type ProductFormFields = z.infer<typeof productSchema>
