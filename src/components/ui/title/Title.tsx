import { titleFont } from '@/config/fonts'
import React from 'react'

interface Props {
  title: string
  subtitle?: string
  className?: string
}

export const Title = ({ title, className, subtitle }: Props) => {
  return (
    <div className={`mt-3 ${className}`}>
      <h1
        className={`${titleFont.className} antialiased text-xl font-semibold mt-8 mb-6`}
      >
        {title}
      </h1>
      {subtitle && <h3 className='text-xl mb-5'>{subtitle}</h3>}
    </div>
  )
}
