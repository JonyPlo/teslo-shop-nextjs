import { cn } from '@/utils'
import React from 'react'
import { IoCardOutline } from 'react-icons/io5'

interface Props {
  summary: boolean
}

export const PaymentStatusAlert = ({ summary }: Props) => {
  return (
    <div
      className={cn(
        'flex items-center rounded px-3.5 py-2 text-xs font-bold text-white',
        {
          'bg-red-500': !summary,
          'bg-green-700': summary,
        }
      )}
    >
      <IoCardOutline size={30} />
      {!summary ? (
        <span className='mx-2'>Outstanding</span>
      ) : (
        <span className='mx-2'>Paid</span>
      )}
    </div>
  )
}
