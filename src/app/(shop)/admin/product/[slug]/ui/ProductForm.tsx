'use client'

import { Category, Product } from '@/interfaces'

interface Props {
  product: Product
  categories: Category[]
}

const sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL']

export const ProductForm = ({ product, categories }: Props) => {
  return (
    <form className='mb-16 grid grid-cols-1 gap-3 px-5 sm:grid-cols-2 sm:px-0'>
      {/* Textos */}
      <div className='w-full'>
        <div className='mb-2 flex flex-col'>
          <span>Title</span>
          <input type='text' className='rounded-md border bg-gray-200 p-2' />
        </div>

        <div className='mb-2 flex flex-col'>
          <span>Slug</span>
          <input type='text' className='rounded-md border bg-gray-200 p-2' />
        </div>

        <div className='mb-2 flex flex-col'>
          <span>Description</span>
          <textarea
            rows={5}
            className='rounded-md border bg-gray-200 p-2'
          ></textarea>
        </div>

        <div className='mb-2 flex flex-col'>
          <span>Price</span>
          <input type='number' className='rounded-md border bg-gray-200 p-2' />
        </div>

        <div className='mb-2 flex flex-col'>
          <span>Tags</span>
          <input type='text' className='rounded-md border bg-gray-200 p-2' />
        </div>

        <div className='mb-2 flex flex-col'>
          <span>Gender</span>
          <select className='rounded-md border bg-gray-200 p-2'>
            <option value=''>[Select]</option>
            <option value='men'>Men</option>
            <option value='women'>Women</option>
            <option value='kid'>Kid</option>
            <option value='unisex'>Unisex</option>
          </select>
        </div>

        <div className='mb-2 flex flex-col'>
          <span>Category</span>
          <select className='rounded-md border bg-gray-200 p-2'>
            <option value=''>[Select]</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        <button className='btn-primary w-full'>Save</button>
      </div>

      {/* Selector de tallas y fotos */}
      <div className='w-full'>
        {/* As checkboxes */}
        <div className='flex flex-col'>
          <span>Sizes</span>
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

          <div className='mb-2 flex flex-col'>
            <span>Pictures</span>
            <input
              type='file'
              multiple
              className='rounded-md border bg-gray-200 p-2'
              accept='image/png, image/jpeg'
            />
          </div>
        </div>
      </div>
    </form>
  )
}
