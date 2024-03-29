//! Con encerrar el nombre de la carpeta entre parentesis, en este caso la carpeta se llama (shop), esto hara que cuando vallamos a la ruta raiz de la aplicacion, por ejemplo la ruta http://localhost:3000, next mostrara el archivo page.tsx de la carpeta shop, en otras palabras estamos diciendo que el archivo page.tsx de la carpeta shop sera el index de la pagina

import { Footer, SideBar, TopMenu } from '@/components'

export default function ShopLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <main className='flex min-h-screen flex-col'>
      <TopMenu />
      <SideBar />
      <div className='mx-5 grow md:container sm:mx-10 md:mx-auto'>
        {children}
      </div>
      <Footer />
    </main>
  )
}
