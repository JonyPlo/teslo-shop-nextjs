'use client'

import { createUpdateProduct, deleteProductImage } from '@/actions'
import { ProductImage } from '@/components'
import type {
  Category,
  Product,
  ProductImage as ProductWithImage,
} from '@/interfaces'
import { cn } from '@/utils'
import { useRouter } from 'next/navigation'
import { useId } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

interface Props {
  product: Partial<Product> & { ProductImage?: ProductWithImage[] }
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

  images?: FileList
}

const sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL']

export const ProductForm = ({ product, categories }: Props) => {
  const id = useId()
  const router = useRouter()

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },

    getValues,

    setValue,
    watch,
  } = useForm<FormInputs>({
    defaultValues: {
      ...product,
      tags: product.tags?.join(', '),
      sizes: product.sizes ?? [],
      images: undefined,
    },
  })

  watch('sizes')

  const onSizeChange = (size: string) => {
    const sizes = new Set(getValues('sizes'))
    sizes.has(size) ? sizes.delete(size) : sizes.add(size)
    setValue('sizes', Array.from(sizes))
  }

  const onSubmit: SubmitHandler<FormInputs> = async (data) => {
    const formData = new FormData()
    const { images, ...productToSave } = data

    if (product.id) formData.append('id', product.id ?? '')
    formData.append('title', productToSave.title)
    formData.append('slug', productToSave.slug)
    formData.append('description', productToSave.description)
    formData.append('price', productToSave.price.toString())
    formData.append('tags', productToSave.tags)
    formData.append('gender', productToSave.gender)
    formData.append('sizes', productToSave.sizes.toString())
    formData.append('categoryId', productToSave.categoryId)
    formData.append('inStock', productToSave.inStock.toString())

    if (images) {
      for (let i = 0; i < images.length; i++) {
        formData.append('images', images[i])
      }
    }

    const { ok, product: updatedCreatedProduct } =
      await createUpdateProduct(formData)

    if (!ok) {
      alert('Error updating product')
      return
    }

    router.replace(`/admin/product/${updatedCreatedProduct?.slug}`)
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

        <div className='mb-2 flex flex-col'>
          <label htmlFor={`${id}-slug`}>Slug</label>
          <input
            {...register('slug')}
            id={`${id}-slug`}
            type='text'
            className='rounded-md border bg-gray-200 p-2'
          />
        </div>

        <div className='mb-2 flex flex-col'>
          <label htmlFor={`${id}-description`}>Description</label>
          <textarea
            {...register('description')}
            id={`${id}-description`}
            rows={5}
            className='rounded-md border bg-gray-200 p-2'
          ></textarea>
        </div>

        <div className='mb-2 flex flex-col'>
          <label htmlFor={`${id}-price`}>Price</label>
          <input
            {...register('price')}
            id={`${id}-price`}
            type='number'
            className='rounded-md border bg-gray-200 p-2'
          />
        </div>

        <div className='mb-2 flex flex-col'>
          <label htmlFor={`${id}-tags`}>Tags</label>
          <input
            {...register('tags')}
            id={`${id}-tags`}
            type='text'
            className='rounded-md border bg-gray-200 p-2'
          />
        </div>

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

        <button type='submit' className='btn-primary w-full'>
          Save
        </button>
      </div>

      <div className='w-full'>
        <div className='mb-2 flex flex-col'>
          <label htmlFor={`${id}-inStock`}>Inventory</label>
          <input
            {...register('inStock')}
            id={`${id}-inStock`}
            type='number'
            className='rounded-md border bg-gray-200 p-2'
          />
        </div>

        <div className='flex flex-col'>
          <label>Sizes</label>
          <div className='flex flex-wrap'>
            {sizes.map((size) => (
              <div
                key={size}
                onClick={() => onSizeChange(size)}
                className={cn(
                  // Base Styles
                  'mb-2 mr-2 w-14 cursor-pointer rounded-md border p-2 text-center transition-all',
                  // Active Styles
                  {
                    'bg-blue-500 text-white': getValues('sizes').includes(size),
                  }
                )}
              >
                <span>{size}</span>
              </div>
            ))}
          </div>

          <div className='mb-2 flex flex-col'>
            <label htmlFor={`${id}-pictures`}>Pictures</label>
            <input
              {...register('images')}
              id={`${id}-pictures`}
              type='file'
              multiple
              className='rounded-md border bg-gray-200 p-2'
              accept='image/png, image/jpeg, image/avif, image/webp'
            />
          </div>
          <div className='mt-2 grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3'>
            {product.ProductImage?.map((image) => (
              <div key={image.id}>
                <ProductImage
                  alt={product.title ?? ''}
                  src={image.url}
                  width={300}
                  height={300}
                  className='w-full rounded-t shadow-md'
                />
                <button
                  type='button'
                  className='btn-danger w-full rounded-b-xl'
                  onClick={() => deleteProductImage(image.id, image.url)}
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </form>
  )
}
