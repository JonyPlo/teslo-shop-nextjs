'use client'

import React, { useId } from 'react'
import { type SubmitHandler, useForm } from 'react-hook-form'
import { type Country } from '@/interfaces'
import { cn } from '@/utils'
import { type AddressFormFields, addressSchema } from '@/validations'
import { zodResolver } from '@hookform/resolvers/zod'

interface Props {
  countries: Country[]
}

export const AddressForm = ({ countries }: Props) => {
  const id = useId()

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isValid, isSubmitting, isValidating },
  } = useForm<AddressFormFields>({
    // defaultValues: {

    // }
    resolver: zodResolver(addressSchema),
  })

  const obSubmit: SubmitHandler<AddressFormFields> = (data) => {
    console.log(data)
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
          {...register('name')}
          id={`${id}-name`}
          type='text'
          placeholder='Eric Plodzien'
          className={cn(
            // Base styles
            'rounded-md border bg-gray-200 p-2',
            // Border styles
            {
              'border-red-500': errors.name,
            }
          )}
          autoFocus
        />
        {/* Name error message */}
        {errors.name && (
          <span className='text-sm text-red-500'>{errors.name.message}</span>
        )}
      </div>

      {/* Surname */}
      <div className='mb-2 flex flex-col'>
        <label htmlFor={`${id}-surname`}>Surname</label>
        <input
          {...register('surname')}
          id={`${id}-surname`}
          type='text'
          className={cn(
            // Base styles
            'rounded-md border bg-gray-200 p-2',
            // Border styles
            {
              'border-red-500': errors.surname,
            }
          )}
        />
        {/* Surname error message */}
        {errors.surname && (
          <span className='text-sm text-red-500'>{errors.surname.message}</span>
        )}
      </div>

      {/* Address */}
      <div className='mb-2 flex flex-col'>
        <label htmlFor={`${id}-address`}>Address</label>
        <input
          {...register('address')}
          id={`${id}-address`}
          type='text'
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
              // checked
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
          disabled={isSubmitting || !isValid}
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
