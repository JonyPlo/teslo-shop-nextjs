'use client'

import { createUpdateProduct } from '@/actions'
import { Category, Product, ProductImage } from '@/interfaces'
import { cn } from '@/utils'
import Image from 'next/image'
import { useId } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

interface Props {
  // En este con la propiedad product, estamos usando el operador '&' para realizar una interseccion de tipos o concatenando tipos, en este caso Product es un interface que tiene diferentes propiedades como por ejemplo { id: string, name: string }, y al interface Product le estamos agregando una propiedad mas llamada 'ProductImage' que es de tipo ProductImage[] quedando la interfaz Product de la siguiente manera: { id: string, name: string, ProductImage: ProductImage[] }
  product: Product & { ProductImage?: ProductImage[] }
  categories: Category[]
}

interface FormInputs {
  title: string
  slug: string
  description: string
  price: number
  inStock: number
  sizes: string[]
  tags: string
  gender: 'men' | 'women' | 'kid' | 'unisex'
  categoryId: string
}

const sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL']

export const ProductForm = ({ product, categories }: Props) => {
  const id = useId()

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    // El metodo 'getValues' nos devuelve es valor de un campo del formulario en ese momento actual, y nos devolvera el valor cada vez que ese campo sea modificado, en otras palabras se ejecutara una re renderizacion para actualizar ese valor que estamos mostrando en pantalla
    getValues,
    // El metodo 'setValue' nos permite modificar el valor de un campo, solo necesitamos pasar 2 argumentos, el primero es el nombre del campo, y el segundo es el nuevo valor
    setValue,
    watch,
  } = useForm<FormInputs>({
    defaultValues: {
      ...product,
      tags: product.tags.join(', '),
      sizes: product.sizes ?? [],
    },
  })

  // Con el watch estamos diciendo que si el campo 'sizes' cambia, entonces re dibujamos o re renderizamos nuevamente el formulario
  watch('sizes')

  const onSizeChange = (size: string) => {
    const sizes = new Set(getValues('sizes'))
    sizes.has(size) ? sizes.delete(size) : sizes.add(size)
    setValue('sizes', Array.from(sizes))
  }

  const onSubmit: SubmitHandler<FormInputs> = async (data) => {
    console.log(data)

    const formData = new FormData()

    const { ...productToSave } = data

    formData.append('id', product.id ?? '')
    formData.append('title', productToSave.title)
    formData.append('slug', productToSave.slug)
    formData.append('description', productToSave.description)
    // Recordar que un FormData no puede almacenar numeros, asi que convertimos el  productToSave.price a un string con el .toString()
    formData.append('price', productToSave.price.toString())
    formData.append('tags', productToSave.tags)
    formData.append('gender', productToSave.gender)
    formData.append('sizes', productToSave.sizes.toString())
    formData.append('categoryId', productToSave.categoryId)
    formData.append('inStock', productToSave.inStock.toString())

    const { ok } = await createUpdateProduct(formData)
    console.log({ ok })
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
        {/* {errors.title && (
          <span className='text-sm text-red-500'>{errors.title.message}</span>
        )} */}

        <div className='mb-2 flex flex-col'>
          <label htmlFor={`${id}-slug`}>Slug</label>
          <input
            {...register('slug')}
            id={`${id}-slug`}
            type='text'
            className='rounded-md border bg-gray-200 p-2'
          />
        </div>
        {/* {errors.slug && (
          <span className='text-sm text-red-500'>{errors.slug.message}</span>
        )} */}

        <div className='mb-2 flex flex-col'>
          <label htmlFor={`${id}-description`}>Description</label>
          <textarea
            {...register('description')}
            id={`${id}-description`}
            rows={5}
            className='rounded-md border bg-gray-200 p-2'
          ></textarea>
        </div>
        {/* {errors.description && (
          <span className='text-sm text-red-500'>
            {errors.description.message}
          </span>
        )} */}

        <div className='mb-2 flex flex-col'>
          <label htmlFor={`${id}-price`}>Price</label>
          <input
            {...register('price')}
            id={`${id}-price`}
            type='number'
            className='rounded-md border bg-gray-200 p-2'
          />
        </div>
        {/* {errors.price && (
          <span className='text-sm text-red-500'>{errors.price.message}</span>
        )} */}

        <div className='mb-2 flex flex-col'>
          <label htmlFor={`${id}-tags`}>Tags</label>
          <input
            {...register('tags')}
            id={`${id}-tags`}
            type='text'
            className='rounded-md border bg-gray-200 p-2'
          />
        </div>
        {/* {errors.tags && (
          <span className='text-sm text-red-500'>{errors.tags.message}</span>
        )} */}

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
        {/* {errors.gender && (
          <span className='text-sm text-red-500'>{errors.gender.message}</span>
        )} */}

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
        {/* {errors.categoryId && (
          <span className='text-sm text-red-500'>
            {errors.categoryId.message}
          </span>
        )} */}

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
              <div
                key={size}
                onClick={() => onSizeChange(size)}
                className={cn(
                  // Base styles
                  'mb-2 mr-2 w-14 cursor-pointer rounded-md border p-2 text-center transition-all',
                  {
                    // Active styles
                    'bg-blue-500 text-white': getValues('sizes').includes(size),
                  }
                )}
              >
                <span>{size}</span>
              </div>
            ))}
          </div>
          {/* {errors.sizes && (
            <span className='text-sm text-red-500'>{errors.sizes.message}</span>
          )} */}

          <div className='mb-2 flex flex-col'>
            <label htmlFor={`${id}-pictures`}>Pictures</label>
            <input
              {...register('ProductImage')}
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
                  priority
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
          {/* {errors.ProductImage && (
            <span className='text-sm text-red-500'>{errors.ProductImage.message}</span>
          )} */}
        </div>
      </div>
    </form>
  )
}
