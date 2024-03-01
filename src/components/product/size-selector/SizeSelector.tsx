import type { Size } from '@/interfaces'
import clsx from 'clsx'

interface Props {
  selectedSize: Size
  availableSizes: Size[]
}

export const SizeSelector = ({ availableSizes, selectedSize }: Props) => {
  return (
    <div className='my-5'>
      <h3 className='mb-4 font-bold'>Available Sizes</h3>

      <div className='flex'>
        {availableSizes.map((size) => (
          <button
            key={size}
            className={clsx('mx-2 text-lg hover:underline', {
              underline: selectedSize === size,
            })}
          >
            {size}
          </button>
        ))}
      </div>
    </div>
  )
}
