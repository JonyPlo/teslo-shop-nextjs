'use client'

import { useState } from 'react'
import Link from 'next/link'
import { type SubmitHandler, useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { IoEyeOffOutline, IoEyeOutline } from 'react-icons/io5'
import { cn } from '@/utils'
import { REGEX } from '../constants/regex.constants'
import { login, registerUser } from '@/actions'

// Creacion del esquema del formulario con zod y las validaciones de cada campo
const schema = z.object({
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

// La propiedad infer del objeto zod se encarga de extraer del schema que le pasemos como argumento el tipado, este tipado es de typescript por lo que podremos usarlo en el useForm de react hook form
type FormFields = z.infer<typeof schema>

export const RegisterForm = () => {
  const [showPassword, setShowPassword] = useState(false)

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = useForm<FormFields>({
    // Para usar el metodo zodResolver() tenemos que instalar una dependencia extra de react hook form que es '@hookform/resolvers', y este contiene una diversidad de metodos para varios schema validators, uno de ellos es zod, y lo que hace practicamente es evaluar si lo que vamos escribiendo en los inputs coincide con el schema o no, y en base a eso nos ira mostrando los diferentes errores
    resolver: zodResolver(schema),
  })

  // El onSubmit puede ser asincrono porque dentro de el vamos a ejecutar un server action, y necesitamos esperar la respuesta del lado del servidor
  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    try {
      const { name, email, password } = data

      // Server actions
      // Realizamos la peticion para registrar al usuario
      const resp = await registerUser({ name, email, password })
      console.log({ resp })
      // Si tenemos un error al crear el user mostramos el mensaje en pantalla
      if (!resp.ok) {
        // Con setError() ingreso el string 'root' que significa que es un error general y no de algun input en particular, y como segundo argumento mandamos el objeto con el type, message, y lo que necesitemos para mostrar en pantalla despues
        return setError('root', {
          message: resp.message,
        })
      }

      // Si el usuario fue creado, entonces lo logeamos y lo redireccionamos al home de la tienda
      // Recordar pasar el email como argumento con el toLowercase()
      await login(email.toLowerCase(), password)

      // Redireccionamos al usuario y recargamos la pagina
      window.location.replace('/')
    } catch (error) {
      console.error(error)

      setError('root', {
        message: 'Internal server error, please try again later',
      })
    }
  }

  const onSetShowPassword = () => {
    setShowPassword(!showPassword)
  }

  return (
    <form className='flex flex-col' onSubmit={handleSubmit(onSubmit)}>
      {/* Name field */}
      <label htmlFor='text'>Full name *</label>
      <input
        className={cn(
          // Base styles
          'rounded border bg-gray-200 px-5 py-2 focus:border focus:border-blue-500',
          // Border styles
          {
            'border-red-500': errors.name,
          }
        )}
        type='text'
        placeholder='Eric Plodzien'
        // La propiedad autoFocus hace que al cargar la pantalla automaticamente hara foco en este input
        autoFocus
        {...register('name')}
      />
      {/* Name error message */}
      {errors.name && (
        <span className='text-sm text-red-500'>{errors.name.message}</span>
      )}

      {/* Email field */}
      <label className='mt-6' htmlFor='email'>
        Email *
      </label>
      <input
        className={cn(
          // Base styles
          'rounded border bg-gray-200 px-5 py-2',
          // Border styles
          {
            'border-red-500': errors.email,
          }
        )}
        type='email'
        placeholder='example@gmail.com'
        {...register('email')}
      />
      {/* Email error message */}
      {errors.email && (
        <span className='text-sm text-red-500'>{errors.email.message}</span>
      )}

      {/* Password field */}
      <label className='mt-6' htmlFor='password'>
        Password *
      </label>
      <div className='relative flex items-center justify-end'>
        <input
          className={cn(
            // Base styles
            'w-full rounded border bg-gray-200 px-5 py-2',
            // Border styles
            {
              'border-red-500': errors.password,
            }
          )}
          type={showPassword ? 'text' : 'password'}
          placeholder='12345678'
          {...register('password')}
        />
        {/* Eye icon */}
        <div
          className='absolute right-3 cursor-pointer'
          onClick={() => onSetShowPassword()}
        >
          {showPassword ? (
            <IoEyeOffOutline size={20} />
          ) : (
            <IoEyeOutline size={20} />
          )}
        </div>
      </div>
      {/* Password error message */}
      {errors.password && (
        <span className='text-sm text-red-500'>{errors.password.message}</span>
      )}

      {/* Buttons */}
      <div className='mt-8 flex flex-col'>
        <button
          className='btn-primary disabled:bg-gray-600'
          disabled={isSubmitting}
        >
          Create
        </button>
        {/* Divider */}
        <div className='my-5 flex items-center'>
          <div className='flex-1 border-t border-gray-500'></div>
          <div className='px-2 text-gray-800'>O</div>
          <div className='flex-1 border-t border-gray-500'></div>
        </div>
        <Link href='/auth/login' className='btn-secondary text-center'>
          Login
        </Link>
        {/* Server error message */}
        {errors.root && (
          <span className='text-md mt-10 text-center text-red-500'>
            {errors.root.message}
          </span>
        )}
      </div>
    </form>
  )
}
