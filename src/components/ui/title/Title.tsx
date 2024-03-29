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
        className={`${titleFont.className} mb-6 mt-8 text-xl font-semibold antialiased`}
      >
        {title}
      </h1>
      {subtitle && <h2 className='mb-5 text-xl capitalize'>{subtitle}</h2>}
    </div>
  )
}
