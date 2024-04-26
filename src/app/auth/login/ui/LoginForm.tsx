'use client'

import { useEffect } from 'react'
import { useFormState, useFormStatus } from 'react-dom'
import Link from 'next/link'
import { authenticate } from '@/actions'
import { IoInformationOutline } from 'react-icons/io5'
import { useSearchParams } from 'next/navigation'
import { SESSION_TYPES } from '../constants/login.constants'

export const LoginForm = () => {
  const [authenticationState, dispatch] = useFormState(authenticate, undefined)
  const param = useSearchParams()
  const path = param.get('redirectTo') || '/'

  useEffect(() => {
    if (authenticationState === SESSION_TYPES.LOGGED) {
      window.location.replace(path)
    }
  }, [authenticationState, SESSION_TYPES.LOGGED])

  return (
    <form action={dispatch} className='flex flex-col'>
      <label htmlFor='email'>Email</label>
      <input
        className='mb-5 rounded border bg-gray-200 px-5 py-2'
        type='email'
        name='email'
      />
      <label htmlFor='password'>Password</label>
      <input
        className='rounded border bg-gray-200 px-5 py-2'
        type='password'
        name='password'
      />
      <div className='relative flex h-10 items-center justify-center'>
        {authenticationState === SESSION_TYPES.INVALID_CREDENTIALS && (
          <div className='absolute flex'>
            <IoInformationOutline className='h-5 w-5 text-red-500' />
            <p className='text-sm text-red-500'>{authenticationState}</p>
          </div>
        )}
      </div>
      <LoginButton />
      {/* Divider */}
      <div className='my-5 flex items-center'>
        <div className='flex-1 border-t border-gray-500'></div>
        <div className='px-2 text-gray-800'>O</div>
        <div className='flex-1 border-t border-gray-500'></div>
      </div>
      <Link
        href={`/auth/new-account?redirectTo=${path}`}
        className='btn-secondary text-center'
      >
        Create new account
      </Link>
    </form>
  )
}

export const LoginButton = () => {
  const { pending } = useFormStatus()

  return (
    <button
      type='submit'
      className='btn-primary disabled:bg-gray-600'
      disabled={pending}
    >
      Login
    </button>
  )
}
