import { ToastOptions } from '@/interfaces'
import { cn } from '@/utils'
import React from 'react'
import { IoCartOutline } from 'react-icons/io5'

export const ToastNotification = ({
  showToast,
  toastMessage,
}: ToastOptions) => {
  return (
    <div
      className={cn(
        // Base Styles
        'alert-dialog-position fixed bottom-3 z-10 flex w-full max-w-fit items-center rounded-lg bg-gray-100 p-3 text-gray-600 shadow',
        // Fade in out animation
        {
          'opacity-100 duration-300': showToast,
          'opacity-0 duration-300': !showToast,
        }
      )}
    >
      <IoCartOutline size={30} className='animate-wiggle text-blue-700' />
      <span className='mx-3 text-sm font-normal'>{toastMessage}</span>
    </div>
  )
}
