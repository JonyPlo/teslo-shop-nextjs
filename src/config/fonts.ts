//* Aqui pondremos las fuentes para usarlas en el proyecto
import { Inter, Montserrat_Alternates } from 'next/font/google'

export const inter = Inter({ subsets: ['latin'] })

// Una buena estrategia para las fuentes es poner un nombre genérico como por ejemplo en este caso es 'titleFont' para que asi en un futuro cuando necesitemos cambiar la fuente, solamente cambiamos la fuente en si que en este caso seria 'Montserrat_Alternates' y no modificamos el nombre de la constante, ya que si modificamos el nombre de la constante y ese nombre se esta usando en varios archivos entonces se deberían hacer varios cambios en varios archivos
export const titleFont = Montserrat_Alternates({
  subsets: ['latin'],
  weight: ['500', '700'],
})
