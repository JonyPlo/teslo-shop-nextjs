import { z } from 'zod'

const REGEX = Object.freeze({
  NAME: /^[A-Za-z\s?]*$/,
  EMAIL:
    /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])*$/,
  PASSWORD: /^(?=.*[a-z])(?=.*\d)[a-zA-Z\d]*$/,
})

export const newAccountSchema = z.object({
  name: z
    .string()
    .min(3, {
      message: 'Name es required and must contain at least 3 character(s)',
    })
    .max(30, { message: 'Name must contain at most 30 character(s)' })
    .regex(REGEX.NAME, { message: 'Name must be a string only' }),
  email: z
    .string()
    .min(8, {
      message: 'Email es required and must contain at least 8 character(s)',
    })
    .email()
    .regex(REGEX.EMAIL, { message: 'Invalid Email' }),
  password: z
    .string()
    .min(8, {
      message: 'Password es required and must contain at least 8 character(s)',
    })
    .max(16, { message: 'Password must contain at most 16 character(s)' })
    .regex(REGEX.PASSWORD, {
      message: 'Password must contain at least 1 letter and 1 number',
    }),
})

export type NewAccountFormFields = z.infer<typeof newAccountSchema>
