'use client'

import { Category, Product, ProductImage } from '@/interfaces'
import { ProductFormFields, productSchema } from '@/validations'
import { zodResolver } from '@hookform/resolvers/zod'
import Image from 'next/image'
import { useId } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

interface Props {
  // En este con la propiedad product, estamos usando el operador '&' para realizar una interseccion de tipos o concatenando tipos, en este caso Product es un interface que tiene diferentes propiedades como por ejemplo { id: string, name: string }, y al interface Product le estamos agregando una propiedad mas llamada 'ProductImage' que es de tipo ProductImage[] quedando la interfaz Product de la siguiente manera: { id: string, name: string, ProductImage: ProductImage[] }
  product: Product & { ProductImage?: ProductImage[] }
  categories: Category[]
}

const sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL']

export const ProductForm = ({ product, categories }: Props) => {
  const id = useId()

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<ProductFormFields>({
    defaultValues: {
      ...product,
      tags: product.tags.join(', '),
      sizes: product.sizes ?? [],
    },

    // resolver: zodResolver(productSchema),
  })

  const onSubmit: SubmitHandler<ProductFormFields> = async (data) => {
    console.log(data)
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className='mb-16 grid grid-cols-1 gap-3 px-5 sm:grid-cols-2 sm:px-0'
    >
      {/* Textos */}
      <div className='w-full'>
        <div className='mb-2 flex flex-col'>
          <label htmlFor={`${id}-title`}>Title</label>
          <input
            {...register('title')}
            id={`${id}-title`}
            type='text'
            className='rounded-md border bg-gray-200 p-2'
          />
        </div>
        {errors.title && (
          <span className='text-sm text-red-500'>{errors.title.message}</span>
        )}

        <div className='mb-2 flex flex-col'>
          <label htmlFor={`${id}-slug`}>Slug</label>
          <input
            {...register('slug')}
            id={`${id}-slug`}
            type='text'
            className='rounded-md border bg-gray-200 p-2'
          />
        </div>
        {errors.slug && (
          <span className='text-sm text-red-500'>{errors.slug.message}</span>
        )}

        <div className='mb-2 flex flex-col'>
          <label htmlFor={`${id}-description`}>Description</label>
          <textarea
            {...register('description')}
            id={`${id}-description`}
            rows={5}
            className='rounded-md border bg-gray-200 p-2'
          ></textarea>
        </div>
        {errors.description && (
          <span className='text-sm text-red-500'>
            {errors.description.message}
          </span>
        )}

        <div className='mb-2 flex flex-col'>
          <label htmlFor={`${id}-price`}>Price</label>
          <input
            {...register('price')}
            id={`${id}-price`}
            type='number'
            className='rounded-md border bg-gray-200 p-2'
          />
        </div>
        {errors.price && (
          <span className='text-sm text-red-500'>{errors.price.message}</span>
        )}

        <div className='mb-2 flex flex-col'>
          <label htmlFor={`${id}-tags`}>Tags</label>
          <input
            {...register('tags')}
            id={`${id}-tags`}
            type='text'
            className='rounded-md border bg-gray-200 p-2'
          />
        </div>
        {errors.tags && (
          <span className='text-sm text-red-500'>{errors.tags.message}</span>
        )}

        <div className='mb-2 flex flex-col'>
          <label htmlFor={`${id}-gender`}>Gender</label>
          <select
            {...register('gender')}
            id={`${id}-gender`}
            className='rounded-md border bg-gray-200 p-2'
          >
            <option value=''>[Select]</option>
            <option value='men'>Men</option>
            <option value='women'>Women</option>
            <option value='kid'>Kid</option>
            <option value='unisex'>Unisex</option>
          </select>
        </div>
        {errors.gender && (
          <span className='text-sm text-red-500'>{errors.gender.message}</span>
        )}

        <div className='mb-2 flex flex-col'>
          <label htmlFor={`${id}-category`}>Category</label>
          <select
            {...register('categoryId')}
            id={`${id}-category`}
            className='rounded-md border bg-gray-200 p-2'
          >
            <option value=''>[Select]</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
        {errors.categoryId && (
          <span className='text-sm text-red-500'>
            {errors.categoryId.message}
          </span>
        )}

        <button type='submit' className='btn-primary w-full'>
          Save
        </button>
      </div>

      {/* Selector de tallas y fotos */}
      <div className='w-full'>
        {/* As checkboxes */}
        <div className='flex flex-col'>
          <label>Sizes</label>
          <div className='flex flex-wrap'>
            {sizes.map((size) => (
              // bg-blue-500 text-white <--- si está seleccionado
              <div
                key={size}
                className='mr-2  flex h-10 w-10 items-center justify-center rounded-md border'
              >
                <span>{size}</span>
              </div>
            ))}
          </div>
          {errors.title && (
            <span className='text-sm text-red-500'>{errors.title.message}</span>
          )}

          <div className='mb-2 flex flex-col'>
            <label htmlFor={`${id}-pictures`}>Pictures</label>
            <input
              id={`${id}-pictures`}
              type='file'
              multiple
              className='rounded-md border bg-gray-200 p-2'
              accept='image/png, image/jpeg'
            />
          </div>
          <div className='grid grid-cols-1 gap-3 sm:grid-cols-3'>
            {product.ProductImage?.map((image) => (
              <div key={image.id}>
                <Image
                  alt={product.title ?? ''}
                  src={`/products/${image.url}`}
                  width={300}
                  height={300}
                  className='rounded-t shadow-md'
                />
                <button
                  type='button'
                  className='btn-danger w-full rounded-b-xl'
                  onClick={() => console.log(image.id, image.url)}
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
          {/* {errors.image && (
            <span className='text-sm text-red-500'>{errors.title.message}</span>
          )} */}
        </div>
      </div>
    </form>
  )
}
