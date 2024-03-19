import type { AlertOptions } from '@/interfaces'
import { cn } from '@/utils'

export const Alert = ({ alertMessage, alertType }: AlertOptions) => {
  return (
    <div
      className={cn(
        // Base styles
        'fade-in mb-4 flex rounded-lg  p-4 text-sm ',
        // Alert type styles
        {
          'bg-red-100 text-red-700': alertType === 'danger',
          'bg-green-100-100 text-green-700': alertType === 'success',
        }
      )}
      role='alert'
    >
      <svg
        className='mr-3 inline h-5 w-5'
        fill='currentColor'
        viewBox='0 0 20 20'
        xmlns='http://www.w3.org/2000/svg'
      >
        <path
          fill-rule='evenodd'
          d='M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z'
          clip-rule='evenodd'
        ></path>
      </svg>
      <div>
        <span className='font-medium'>{alertMessage}</span>
      </div>
    </div>
  )
}
