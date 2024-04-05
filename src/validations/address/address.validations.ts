import z from 'zod'

const REGEX = Object.freeze({
  NAME: /^[A-Za-z\s?]*$/,
  ADDRESS: /^[A-Za-z0-9\s?]*$/,
  POSTAL_CODE: /^[A-Za-z0-9\s?]*$/,
  CITY: /^[A-Za-z\s?]*$/,
  COUNTRY: /^[A-Za-z\s?]*$/,
  TELEPHONE: /^[0-9]*$/,
})

//! Recordar que el metodo required() no funciona cuando se usa zod con react hook form, en su lugar hay que usar min(1)
export const addressSchema = z.object({
  name: z
    .string()
    .min(3, {
      message: 'Name is required and must contain at least 3 character(s)',
    })
    .max(30, { message: 'Name must contain at most 30 character(s)' })
    .regex(REGEX.NAME, { message: 'The name must be a string only' }),
  surname: z
    .string()
    .min(3, {
      message: 'Surname is required and must contain at least 3 character(s)',
    })
    .max(30, { message: 'Surename must contain at most 30 character(s)' })
    .regex(REGEX.NAME, { message: 'Surname must be a string only' }),
  address: z
    .string()
    .min(6, {
      message: 'Address is required and must contain at least 6 character(s)',
    })
    .max(50, { message: 'Address must contain at most 50 character(s)' })
    .regex(REGEX.ADDRESS, {
      message: 'Address must be a string or number only',
    }),
  address2: z
    .string()
    .min(6, { message: 'Address must contain at least 6 character(s)' })
    .max(50, { message: 'Address must contain at most 50 character(s)' })
    .regex(REGEX.ADDRESS, {
      message: 'Address must be a string or number only',
    })
    // El metodo optional() hace que el campo sea opcional (address2?)
    .optional()
    // El metodo or() hace que el campo pueda estar vacio y no marque ningun error, pero cuando tiene al menos 1 caracter entonces si se ejecutan las validaciones
    .or(z.literal('')),
  postalCode: z
    .string()
    .min(4, {
      message:
        'Postal code is required and must contain at least 4 character(s)',
    })
    .max(10, { message: 'Postal code must contain at most 10 character(s)' })
    .regex(REGEX.POSTAL_CODE, {
      message: 'Postal code must be a string or number only',
    }),
  city: z
    .string()
    .min(3, {
      message: 'City is required and must contain at least 3 character(s)',
    })
    .max(30, { message: 'City must contain at most 30 character(s)' })
    .regex(REGEX.CITY, {
      message: 'City must be a string only',
    }),
  country: z
    .string()
    .min(3, {
      message: 'Country is required and must contain at least 3 character(s)',
    })
    .max(20, { message: 'Country must contain at most 20 character(s)' })
    .regex(REGEX.COUNTRY, {
      message: 'Country must be a string only',
    }),
  telephone: z
    .string()
    .min(10, {
      message:
        'Telephone is required and must contain at least 10 character(s)',
    })
    .max(15, { message: 'Telephone must contain at most 15 character(s)' })
    .regex(REGEX.TELEPHONE, {
      message: 'Telephone must be a number only',
    }),
  rememberAddress: z.boolean(),
})

export type AddressFormFields = z.infer<typeof addressSchema>
