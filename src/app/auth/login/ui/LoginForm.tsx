'use client'

import { authenticate } from '@/actions'
import Link from 'next/link'
import React from 'react'
import { useFormState } from 'react-dom'

export const LoginForm = () => {
  // El hook useFormState() recibe 2 argumentos, el primero es la accion que realizara el login, y el segundo es el estado inicial
  const [errorMessage, dispatch] = useFormState(authenticate, undefined)

  console.log({ errorMessage })

  return (
    // En este caso, usaremos el atributo 'action' del form para enviar la data del formularion en el metodo 'dispatch', y ese dispatch es el metodo que enviara la data a la accion 'authenticate' para realizar el login
    <form action={dispatch} className='flex flex-col'>
      <label htmlFor='email'>Email</label>
      <input
        className='mb-5 rounded border bg-gray-200 px-5 py-2'
        type='email'
        //! Importante agregar SIEMPRE el name a los inputs, ya que tanto el server action como el archivo 'auth.config.ts' usaran los names de los inputs para usarlos como nombre o key en el objeto del formulario, por ejemplo en este caso en name del email es 'email', entonces cuando mandemos el email los archivos recibiran esto { email: 'jony@gmail.com' }, esa propiedad 'email' del objeto es el valor del 'name' del input. Recordar que si no se agrega el name a los inputs la autenticacion NO FUNCIONARA porque no se podra parsear la informacion.
        name='email'
      />
      <label htmlFor='email'>Password</label>
      <input
        className='mb-5 rounded border bg-gray-200 px-5 py-2'
        type='password'
        name='password'
      />
      <button type='submit' className='btn-primary'>
        Login
      </button>
      {/* Divider */}
      <div className='my-5 flex items-center'>
        <div className='flex-1 border-t border-gray-500'></div>
        <div className='px-2 text-gray-800'>O</div>
        <div className='flex-1 border-t border-gray-500'></div>
      </div>
      <Link href='/auth/new-account' className='btn-secondary text-center'>
        Create new account
      </Link>
    </form>
  )
}
