import { auth } from '@/auth.config'
import { redirect } from 'next/navigation'

export default async function ShopLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // Al 'auth' lo tomamos del archivo de configuracion 'auth.config.ts', este metodo lo usamos como un middleware y tambien nos sirve para obtener la informacion de la autenticacion en componentes que esten del lado del servidor, la constante session almacenara un objeto con 2 propiedades, la primera es 'user', por defecto esta propiedad contendra un objeto con name, email, y el image del usuario, pero si queremos agregar mas propiedades con mas valores podemos hacerlo, y la segunda propiedad es 'expires' que contendra una fecha en formato date que contiene el tiempo de expiracion de la session (tener en cuenta que cuando se actualiza la pagina este tiempo se resetea para mantener la sesion siembre abierta mientras se esta usando la pagina).
  // Por ultimo, este 'auth' toma la informacion de la sesion desde las cookies que se almacenaron desde el momento que iniciamos sesion, asi que si borramos las cookies, la funcion auth() devolvera null
  const session = await auth()

  // Si la constante 'session' es un objeto y tiene la propiedad 'user' entonces el usuario esta logueado, por lo tanto el servidor lo redirecciona al home de la aplicacion, entonces cuando se quiera volver a la pagina de registro o login, nos devolvera al home de la pagina porque el componente 'layout' es el que esta encerrando las paginas de autenticacion, asi que este componente es el que tiene la logica para redireccionar
  // if (session?.user) {
  //   redirect('/')
  // }

  return (
    <main className='flex justify-center'>
      <div className='w-full px-10 sm:w-[400px]'>{children}</div>
    </main>
  )
}
