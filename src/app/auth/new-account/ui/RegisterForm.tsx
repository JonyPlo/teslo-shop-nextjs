'use client'

import { useState } from 'react'
import Link from 'next/link'
import { type SubmitHandler, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { IoEyeOffOutline, IoEyeOutline } from 'react-icons/io5'
import { cn } from '@/utils'
import { login, registerUser } from '@/actions'
import { useSearchParams } from 'next/navigation'
import { NewAccountFormFields, newAccountSchema } from '@/validations'

export const RegisterForm = () => {
  const [showPassword, setShowPassword] = useState(false)

  const param = useSearchParams()
  const path = param.get('redirectTo') || '/'

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<NewAccountFormFields>({
    resolver: zodResolver(newAccountSchema),
  })

  const onSubmit: SubmitHandler<NewAccountFormFields> = async (data) => {
    try {
      const { name, email, password } = data

      const resp = await registerUser({ name, email, password })

      if (!resp.ok) {
        return setError('root', {
          message: resp.message,
        })
      }

      await login(email.toLowerCase(), password)

      window.location.replace(path)
    } catch (error) {
      console.error(error)

      setError('root', {
        message: 'Internal server error, please try again later',
      })
    }
  }

  return (
    <form className='flex flex-col' onSubmit={handleSubmit(onSubmit)}>
      {/* Name field */}
      <label htmlFor='text'>Full name *</label>
      <input
        className={cn(
          'rounded border bg-gray-200 px-5 py-2 focus:border focus:border-blue-500',

          {
            'border-red-500': errors.name,
          }
        )}
        type='text'
        placeholder='Eric Plodzien'
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
          'rounded border bg-gray-200 px-5 py-2',

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
            'w-full rounded border bg-gray-200 px-5 py-2',

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
          onClick={() => setShowPassword(!showPassword)}
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
          type='submit'
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
        <Link
          href={`/auth/login?redirectTo=${path}`}
          className='btn-secondary text-center'
        >
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
