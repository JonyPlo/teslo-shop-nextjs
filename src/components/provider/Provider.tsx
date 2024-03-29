'use client'

//* Este componente Provider es que envolvera toda las rutas de la aplicacion para poder adquirir la informacion del usuario autenticado, y para eso vamos a usarlo en el componente 'layout.tsx' de la ruta 'src/app/layout.tsx' que es el componente mas alto y asi el provider pueda enviar a todos los componentes de la aplicacion la informacion de la autenticacion, seria algo similar a usar el context de React o el componente Provider de react redux.

//* Si se esta usando otros providers en la aplicacion seria conveniente usarlos a todos aqui para mantener limpio el componente 'layout.tsx' y solo con llamar al <Provider /> para obtener todos los proveedores

import { SessionProvider } from 'next-auth/react'

interface Props {
  children: React.ReactNode
}

export const Provider = ({ children }: Props) => {
  return (
    //! IMPORTANTE: Para que el componente SessionProvider funcione, no solo basta con envolver toda la aplicacion con el Provider, ya que el proveedor buscara la informacion del usuario autenticado haciendo un GET a 'http://localhost:3000/api/auth/session' pero si esa ruta no existe entonces seguira dando error, asi que vamos a crear el endpoint en la ruta 'app/api/auth/[...nextauth]/route.ts' y dentro de route.ts llamar al GET de los 'handlers' que vienen del archivo de configuracion 'auth.config.ts'
    <SessionProvider>{children}</SessionProvider>
  )
}
