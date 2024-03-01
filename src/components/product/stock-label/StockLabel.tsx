'use client'

import { getStockBySlug } from '@/actions'
// Este componente se lo realiza del lado del cliente porque cada vez que el componente se monte quiero que se realizar la peticion de stock para mantenerlo actualizado cada vez que el usuario entra a ver un producto, toda la otra informacion como el titulo del product etc se mantendra en cache porque todo eso esta generado del lado del servidor menos el stock que en este caso lo estoy mostrando generado desde el cliente

import { titleFont } from '@/config/fonts'
import { useEffect, useState } from 'react'

interface Props {
  slug: string
}

export const StockLabel = ({ slug }: Props) => {
  const [stock, setStock] = useState(0)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const getStock = async () => {
      const inStock = await getStockBySlug(slug)
      setStock(inStock)
      setIsLoading(false)
    }

    getStock()
  }, [slug])

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
