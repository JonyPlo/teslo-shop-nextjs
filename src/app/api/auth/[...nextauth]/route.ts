//* De esta forma el provider SessionProvider ya puede obtener con la peticion GET de los 'handlers' la informacion de los usuarios autenticados para poder proveerla a los demas componentes, tambien tenemos el metodo POST para poder realizar registros de nuevos usuarios

//* NOTA: Si se implementa esta configuracion con la aplicacion ejecutandose, tendremos que reiniciar la ejecucion para que se apliquen los cambios

import { handlers } from '@/auth.config'

export const { GET, POST } = handlers
