//! Con encerrar el nombre de la carpeta entre parentesis, en este caso la carpeta se llama (shop), esto hara que cuando vallamos a la ruta raiz de la aplicacion, por ejemplo en vez de llegar a la pagina con la ruta 'http://localhost:3000/shop' llegaremos con la ruta 'http://localhost:3000', en otras palabras, estariamos quitando el path 'shop' de la ruta para que con solo 'http://localhost:3000' ya lleguemos a la pagina

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
