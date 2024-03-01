'use client'

import { useState } from 'react'
import { IoAddCircleOutline, IoRemoveCircleOutline } from 'react-icons/io5'

interface Props {
  quantity: number
}

export const QuantitySelector = ({ quantity }: Props) => {
  const [count, setCount] = useState(quantity)

  const quantityChange = (value: number) => {
    if (count + value < 1) return
    setCount(count + value)
  }

  return (
    <div className='flex'>
      <button onClick={() => quantityChange(-1)}>
        <IoRemoveCircleOutline size={30} />
      </button>
      <span className='mx-3 grid w-20 place-items-center rounded bg-gray-100 px-5 align-middle'>
        {count}
      </span>
      <button onClick={() => quantityChange(1)}>
        <IoAddCircleOutline size={30} />
      </button>
    </div>
  )
}
