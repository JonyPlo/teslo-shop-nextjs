'use client'

import { IoAddCircleOutline, IoRemoveCircleOutline } from 'react-icons/io5'

interface Props {
  quantity: number
  stock: number

  onSetQuantity: (quantity: number) => void
}

export const QuantitySelector = ({ quantity, stock, onSetQuantity }: Props) => {
  const quantityChange = (value: number) => {
    const newQuantity = quantity + value
    if (newQuantity < 1 || newQuantity > stock) return
    onSetQuantity(newQuantity)
  }

  return (
    <div className='mt-2 flex'>
      <button onClick={() => quantityChange(-1)}>
        <IoRemoveCircleOutline size={30} />
      </button>
      <span className='mx-3 grid w-20 place-items-center rounded bg-gray-100 px-5 align-middle'>
        {quantity}
      </span>
      <button onClick={() => quantityChange(1)}>
        <IoAddCircleOutline size={30} />
      </button>
    </div>
  )
}
