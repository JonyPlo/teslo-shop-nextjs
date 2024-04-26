'use client'

import { getStockBySlug } from '@/actions'
import { titleFont } from '@/config/fonts'
import { useProductBoundStore } from '@/store'
import { useEffect } from 'react'

interface Props {
  slug: string
}

export const StockLabel = ({ slug }: Props) => {
  const { stock, isLoading, setStock, setIsLoading } = useProductBoundStore()

  useEffect(() => {
    const getStock = async () => {
      const inStock = await getStockBySlug(slug)
      setStock(inStock)
      setIsLoading(false)
    }
    getStock()

    return () => {
      setIsLoading(true)
    }
  }, [setIsLoading, setStock, slug])

  return (
    <>
      {isLoading ? (
        //  Skeleton
        <h2
          className={`${titleFont.className} w-[81px] animate-pulse rounded bg-gray-200 text-lg font-bold antialiased`}
        >
          &nbsp;
        </h2>
      ) : (
        //  Stock Info
        <h2
          className={`${titleFont.className} w-fit text-lg font-bold antialiased`}
        >
          Stock: {stock}
        </h2>
      )}
    </>
  )
}
