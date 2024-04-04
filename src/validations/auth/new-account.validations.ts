import { REGEX } from '@/app/auth/new-account/constants/regex.constants'
import { z } from 'zod'

// Creacion del esquema del formulario con zod y las validaciones de cada campo
export const newAccountSchema = z.object({
  name: z
    .string({
      required_error: 'Name is required',
      invalid_type_error: 'Name must be a string',
    })
    .min(6, { message: 'Name must contain at least 6 character(s)' })
    .max(30, { message: 'Name must contain at most 30 character(s)' })
    .regex(REGEX.NAME, { message: 'Name must be a string only' }),
  email: z
    .string({
      required_error: 'Email is required',
      invalid_type_error: 'Email must be a string',
    })
    .email()
    .regex(REGEX.EMAIL, { message: 'Invalid Email' }),
  password: z
    .string({
      required_error: 'Password is required',
      invalid_type_error: 'Password must be a string',
    })
    .min(8, { message: 'Password must contain at least 8 character(s)' })
    .max(16, { message: 'Password must contain at most 16 character(s)' })
    .regex(REGEX.PASSWORD, {
      message: 'Password must contain at least 1 letter and 1 number',
    }),
})

// La propiedad infer del objeto zod se encarga de extraer el tipado del schema, este tipado es de typescript por lo que podremos usarlo en el useForm de react hook form
export type NewAccountFormFields = z.infer<typeof newAccountSchema>
