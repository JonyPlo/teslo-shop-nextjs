'use client'

import { useEffect } from 'react'
import { useFormState, useFormStatus } from 'react-dom'
import Link from 'next/link'
import { authenticate } from '@/actions'
import { IoInformationOutline } from 'react-icons/io5'
import { useSearchParams } from 'next/navigation'
import { SESSION_TYPES } from '../constants/login.constants'

export const LoginForm = () => {
  // El hook useFormState() recibe 2 argumentos, el primero es la accion que realizara el login, y el segundo es el estado inicial
  const [authenticationState, dispatch] = useFormState(authenticate, undefined)

  // Si llegamos a la pagina del login con algun query parameter, lo tomamos y lo guardamos en la constante param
  const param = useSearchParams()
  // Obtenemos la ruta del query parameter
  const path = param.get('redirectTo') || '/'

  useEffect(() => {
    if (authenticationState === SESSION_TYPES.LOGGED) {
      // Aqui hacemos un 'router.replace' para reemplazar la url del login por la nueva a la que vamos a redireccionar
      // En este caso no lo usamos porque router.replace('/') redirecciona pero no actualiza la pagina por lo tanto los states de otros componentes no se actualizan, y necesito que las opciones del sidebar se actualicen cuando el usuario se loguea, asi que en su lugar usaremos window.location.replace('/') que es un metodo tradicional de javascript para redireccionar a una pagina y actualizarla, dejo el router replace para que quede el ejemplo
      // router.replace('/')

      // Si el query parameter 'redirectTo' tiene alguna ruta entonces redireccionamos al usuario a esa ruta cuando inicie sesion, de lo contrario lo redireccionamos al home '/'
      window.location.replace(path)
    }
  }, [authenticationState, SESSION_TYPES.LOGGED])

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
