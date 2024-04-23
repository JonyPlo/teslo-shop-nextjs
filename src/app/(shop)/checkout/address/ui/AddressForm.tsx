'use client'

import React, { useEffect, useId } from 'react'
import { type SubmitHandler, useForm } from 'react-hook-form'
import type { Address, Country } from '@/interfaces'
import { cn } from '@/utils'
import { type AddressFormFields, addressSchema } from '@/validations'
import { zodResolver } from '@hookform/resolvers/zod'
import { useAddressBoundStore } from '@/store'
import { deleteUserAddress, setUserAddress } from '@/actions'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'

interface Props {
  countries: Country[]
  // El tipo Partial en typescript hace que todas las propiedades que se manden en el generico sean opcionales, en este caso 'Address' es un interface con propiedades obligatorias, pero el Partial hace que todas las propiedades tengan el ? al final haciendo que ahora sean opcionales
  userAddressDataBase?: Partial<Address> | null
}

export const AddressForm = ({ countries, userAddressDataBase = {} }: Props) => {
  const id = useId()
  const { address, setAddress } = useAddressBoundStore()
  const { data: session } = useSession()
  const router = useRouter()

  // React hook form
  const {
    register,
    handleSubmit,
    setError,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<AddressFormFields>({
    // Si al cargar la pagina la direccion del usuario estaba guardada en la base de datos entonces usamos esa informacion para cargar los inputs, de lo contrario usamos el local storage de zustand que eso lo hacemos en el useeffect
    defaultValues: {
      ...userAddressDataBase,
      rememberAddress: false,
    },
    resolver: zodResolver(addressSchema),
  })

  useEffect(() => {
    // El metodo reset de react hook form puede resetear el formulario si lo llamamos sin ningun argumento 'reset()' pero si le mandamos un objeto, este verificara si el nombre de las propiedades del objeto coinciden con el nombre de los campos del formulario, entonces establecera los valores del objeto en cada campo del formulario
    //* Con este if pregunto si los datos de la direccion del usuario no vienen de la base de datos, entonces ejecuto el metodo reset de react hook form que tomara el objeto 'address' que viene del local storage y usara esos valores para los campos
    if (!userAddressDataBase) reset(address)
  }, [address, userAddressDataBase])

  const obSubmit: SubmitHandler<AddressFormFields> = async (data) => {
    const { rememberAddress, ...restAddress } = data

    try {
      if (data.rememberAddress) {
        await setUserAddress(restAddress, session!.user.id)
      } else {
        await deleteUserAddress(session!.user.id)
      }

      setAddress(restAddress)
      router.push('/checkout')
    } catch (error) {
      console.log(error)

      setError('root', {
        message: 'Internal server error, please try again later',
      })
    }
  }

  return (
    <form
      className='grid grid-cols-1 gap-2 sm:grid-cols-2 sm:gap-5'
      onSubmit={handleSubmit(obSubmit)}
    >
      {/* Name */}
      <div className='mb-2 flex flex-col'>
        <label htmlFor={`${id}-name`}>Name</label>
        <input
          {...register('firstName')}
          id={`${id}-name`}
          type='text'
          placeholder='Juan'
          className={cn(
            // Base styles
            'rounded-md border bg-gray-200 p-2',
            // Border styles
            {
              'border-red-500': errors.firstName,
            }
          )}
          autoFocus
        />
        {/* Name error message */}
        {errors.firstName && (
          <span className='text-sm text-red-500'>
            {errors.firstName.message}
          </span>
        )}
      </div>

      {/* Lastname */}
      <div className='mb-2 flex flex-col'>
        <label htmlFor={`${id}-surname`}>Surname</label>
        <input
          {...register('lastName')}
          id={`${id}-surname`}
          type='text'
          placeholder='Gomez'
          className={cn(
            // Base styles
            'rounded-md border bg-gray-200 p-2',
            // Border styles
            {
              'border-red-500': errors.lastName,
            }
          )}
        />
        {/* Lastname error message */}
        {errors.lastName && (
          <span className='text-sm text-red-500'>
            {errors.lastName.message}
          </span>
        )}
      </div>

      {/* Address */}
      <div className='mb-2 flex flex-col'>
        <label htmlFor={`${id}-address`}>Address</label>
        <input
          {...register('address')}
          id={`${id}-address`}
          type='text'
          placeholder='Juan B Justo 123'
          className={cn(
            // Base styles
            'rounded-md border bg-gray-200 p-2',
            // Border styles
            {
              'border-red-500': errors.address,
            }
          )}
        />
        {/* Address error message */}
        {errors.address && (
          <span className='text-sm text-red-500'>{errors.address.message}</span>
        )}
      </div>

      {/* Address 2 */}
      <div className='mb-2 flex flex-col'>
        <label htmlFor={`${id}-address2`}>Address 2 (Optional)</label>
        <input
          {...register('address2')}
          id={`${id}-address2`}
          type='text'
          placeholder='Juan B Justo 456'
          className={cn(
            // Base styles
            'rounded-md border bg-gray-200 p-2',
            // Border styles
            {
              'border-red-500': errors.address2,
            }
          )}
        />
        {/* Address2 error message */}
        {errors.address2 && (
          <span className='text-sm text-red-500'>
            {errors.address2.message}
          </span>
        )}
      </div>

      {/* Postal */}
      <div className='mb-2 flex flex-col'>
        <label htmlFor={`${id}-postalCode`}>Postal Code</label>
        <input
          {...register('postalCode')}
          id={`${id}-postalCode`}
          type='text'
          placeholder='0000'
          className={cn(
            // Base styles
            'rounded-md border bg-gray-200 p-2',
            // Border styles
            {
              'border-red-500': errors.postalCode,
            }
          )}
        />
        {/* Postal code error message */}
        {errors.postalCode && (
          <span className='text-sm text-red-500'>
            {errors.postalCode.message}
          </span>
        )}
      </div>

      {/* City */}
      <div className='mb-2 flex flex-col'>
        <label htmlFor={`${id}-city`}>City</label>
        <input
          {...register('city')}
          id={`${id}-city`}
          type='text'
          placeholder='San Miguel de Tucuman'
          className={cn(
            // Base styles
            'rounded-md border bg-gray-200 p-2',
            // Border styles
            {
              'border-red-500': errors.city,
            }
          )}
        />
        {/* City error message */}
        {errors.city && (
          <span className='text-sm text-red-500'>{errors.city.message}</span>
        )}
      </div>

      {/* Country */}
      <div className='mb-2 flex flex-col'>
        <label htmlFor={`${id}-country`}>Country</label>
        <select
          {...register('country')}
          id={`${id}-country`}
          className={cn(
            // Base styles
            'rounded-md border bg-gray-200 p-2',
            // Border styles
            {
              'border-red-500': errors.country,
            }
          )}
        >
          <option value=''>[ Select ]</option>
          {countries.map(({ id, name }) => (
            <option key={id} value={id}>
              {name}
            </option>
          ))}
        </select>
        {/* Country error message */}
        {errors.country && (
          <span className='text-sm text-red-500'>{errors.country.message}</span>
        )}
      </div>

      {/* Telephone */}
      <div className='mb-2 flex flex-col'>
        <label htmlFor={`${id}-telephone`}>Telephone</label>
        <input
          {...register('telephone')}
          id={`${id}-telephone`}
          type='text'
          placeholder='1234567890'
          className={cn(
            // Base styles
            'rounded-md border bg-gray-200 p-2',
            // Border styles
            {
              'border-red-500': errors.telephone,
            }
          )}
        />
        {/* Telephone error message */}
        {errors.telephone && (
          <span className='text-sm text-red-500'>
            {errors.telephone.message}
          </span>
        )}
      </div>

      <div className='mb-2 flex flex-col'>
        {/* Remember address checkbox */}
        <div className='mb-10 inline-flex items-center'>
          <label
            className='relative me-3 flex cursor-pointer items-center rounded-full'
            htmlFor='checkbox'
          >
            <input
              {...register('rememberAddress')}
              type='checkbox'
              className="before:content[''] border-blue-gray-200 before:bg-blue-gray-500 peer relative h-5 w-5 cursor-pointer appearance-none rounded-md border border-gray-500 transition-all before:absolute before:left-2/4 before:top-2/4 before:block before:h-12 before:w-12 before:-translate-x-2/4 before:-translate-y-2/4 before:rounded-full before:opacity-0 before:transition-opacity checked:border-blue-500 checked:bg-blue-500 checked:before:bg-blue-500 hover:before:opacity-10"
              id='checkbox'
            />
            <div className='pointer-events-none absolute left-2/4 top-2/4 -translate-x-2/4 -translate-y-2/4 text-white opacity-0 transition-opacity peer-checked:opacity-100'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='h-3.5 w-3.5'
                viewBox='0 0 20 20'
                fill='currentColor'
                stroke='currentColor'
                strokeWidth='1'
              >
                <path
                  fillRule='evenodd'
                  d='M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z'
                  clipRule='evenodd'
                ></path>
              </svg>
            </div>
          </label>
          <span id='checkbox'>Remember Address</span>
        </div>
        {/* Submit button */}
        <button
          type='submit'
          className='btn-primary disabled:bg-gray-600'
          disabled={isSubmitting}
        >
          Next
        </button>
      </div>

      {/* Server error message */}
      {errors.root && (
        <span className='text-md mt-10 text-center text-red-500'>
          {errors.root.message}
        </span>
      )}
    </form>
  )
}
