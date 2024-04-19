import { cn } from '@/utils'
import React from 'react'
import { IoCardOutline } from 'react-icons/io5'

interface Props {
  isPaid: boolean
}

export const PaymentStatusAlert = ({ isPaid }: Props) => {
  return (
    <div
      className={cn(
        // Base styles
        'flex items-center rounded px-3.5 py-2 text-xs font-bold text-white',

        // Is pais styles
        {
          'bg-red-500': !isPaid,
          'bg-green-700': isPaid,
        }
      )}
    >
      <IoCardOutline size={30} />
      <span className='mx-2'>{isPaid ? 'Paid' : 'Outstanding'}</span>
    </div>
  )
}
