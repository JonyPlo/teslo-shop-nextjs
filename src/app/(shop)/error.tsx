// El componente error.tsx se muestra cuando ocurren errores inesperados en server components y client components
// A diferencia del not-found.tsx, error.tsx se muestra cuando ocurren errores inesperados como por ejemplo que una peticion salga mal y retorne un throw new Error(), y not-found.tsx se muestra solo cuando la funcion notFound() se ejecuta en algún componente de ruta, o sea en algun componente que este dentro de la carpeta app/

'use client'

import { PageNotFound } from '@/components'

export default function NotFound() {
  return <PageNotFound />
}
