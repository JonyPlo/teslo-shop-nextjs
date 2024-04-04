import type { Metadata } from 'next'
import './globals.css'

import { inter } from '@/config/fonts'
import { Provider } from '@/components'

export const metadata: Metadata = {
  //* De esta forma agregamos un comodín al metadata del titulo de las paginas, con la propiedad template agregamos un "%s" al principio del string, y esto es para que el string " - Teslo | Shop" no sobre escriba los títulos de otras paginas y se concatene al final, por ejemplo si en otra pagina el title es 'Ropa Deportiva' y aqui el template es solamente ' - Teslo | Shop' entonces el title de la pagina ya no sera 'Ropa Deportiva', ahora sera ' - Teslo | Shop', pero si al templete le agregamos el "%s" el principio de esta forma '%s - Teslo | Shop' el title de la pagina sera 'Ropa Deportiva - Teslo | Shop', y por ultimo la propiedad default define el titulo por defecto para las paginas que no tengan un title definido o un metadata, de nada Jony del futuro
  title: {
    template: '%s - Teslo | Shop',
    default: 'Home - Teslo | Shop',
  },
  description: 'Virtual shop of products',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en' suppressHydrationWarning={true}>
      <body className={inter.className}>
        {/* Envolvemos todos los componentes de la aplicacion con el provider para que asi todos los componentes tengan la informacion de los diferentes proveedores */}
        <Provider>{children}</Provider>
      </body>
    </html>
  )
}
