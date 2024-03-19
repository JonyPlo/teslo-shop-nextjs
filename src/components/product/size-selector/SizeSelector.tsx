import type { Size } from '@/interfaces'
import clsx from 'clsx'

interface Props {
  selectedSize?: Size
  availableSizes: Size[]

  onSetSize: (size: Size) => void
}

export const SizeSelector = ({
  selectedSize,
  availableSizes,
  onSetSize,
}: Props) => {
  return (
    <div className='my-5'>
      <h3 className='mb-4 font-bold'>Available Sizes</h3>
      <div className='flex'>
        {availableSizes.map((size) => (
          <button
            key={size}
            onClick={() => onSetSize(size)}
            className={clsx(
              'mx-2 text-lg decoration-2 underline-offset-4 hover:underline',
              {
                underline: selectedSize === size,
              }
            )}
          >
            {size}
          </button>
        ))}
      </div>
    </div>
  )
}
