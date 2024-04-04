'use client'

import { getStockBySlug } from '@/actions'
import { titleFont } from '@/config/fonts'
import { CartProduct } from '@/interfaces'
import { useCartBoundStore } from '@/store'
import { useEffect, useState } from 'react'

interface Props {
  product: CartProduct
}

export const CartStockLabel = ({ product }: Props) => {
  const [stock, setStock] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  const { syncProductQuantityWithStock } = useCartBoundStore()

  useEffect(() => {
    const getStock = async () => {
      const inStock = await getStockBySlug(product.slug)

      syncProductQuantityWithStock(product, inStock)

      setStock(inStock)
      setIsLoading(false)
    }

    getStock()
  }, [])

  return (
    <>
      {isLoading ? (
        //  Skeleton
        <span
          className={`${titleFont.className} block w-[70px] animate-pulse rounded bg-gray-200 text-lg font-bold antialiased`}
        >
          &nbsp;
        </span>
      ) : (
        //  Stock Info
        <span
          className={`${titleFont.className} w-fit text-sm font-bold text-gray-500 antialiased`}
        >
          Stock: {stock}
        </span>
      )}
    </>
  )
}
