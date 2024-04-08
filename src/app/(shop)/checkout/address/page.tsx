import { Title } from '@/components'
import { AddressForm } from './ui/AddressForm'
import { getCountries, getUserAddress } from '@/actions'
import { auth } from '@/auth.config'

export default async function AddressPage() {
  const countries = await getCountries()
  // Al 'auth' lo tomamos del archivo de configuracion 'auth.config.ts', este metodo lo usamos como un middleware y tambien nos sirve para obtener la informacion de la autenticacion en componentes que esten del lado del servidor, la constante session almacenara un objeto con 2 propiedades, la primera es 'user', por defecto esta propiedad contendra un objeto con name, email, y el image del usuario, pero si queremos agregar mas propiedades con mas valores podemos hacerlo, y la segunda propiedad es 'expires' que contendra una fecha en formato date que contiene el tiempo de expiracion de la session (tener en cuenta que cuando se actualiza la pagina este tiempo se resetea para mantener la sesion siembre abierta mientras se esta usando la pagina).
  // Por ultimo, este 'auth' toma la informacion de la sesion desde las cookies que se almacenaron desde el momento que iniciamos sesion, asi que si borramos las cookies, la funcion auth() devolvera null
  const session = await auth()

  if (!session?.user) {
    return <h3 className='text-5xl'>500 - User session not exist</h3>
  }

  const userAddress = await getUserAddress(session?.user.id)

  return (
    <div className='mb-72 flex flex-col px-10 sm:items-center sm:justify-center sm:px-0'>
      <div className='flex  w-full flex-col justify-center text-left xl:w-[1000px]'>
        <Title title='Address' subtitle='Delivery Address' />
        <AddressForm countries={countries} userAddressDataBase={userAddress} />
      </div>
    </div>
  )
}
