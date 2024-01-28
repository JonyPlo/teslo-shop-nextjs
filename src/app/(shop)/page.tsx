import { titleFont } from '@/config/fonts'

export default function Home() {
  return (
    <main className=''>
      <h1>Hola mundo</h1>
      {/* De esta forma aplicamos una fuente diferente a una etiqueta, esta fuente aplica tambien para todas la etiquetas que esten dentro de ella */}
      <h1 className={`${titleFont.className} font-bold`}>Hola mundo</h1>
      <h1 className={titleFont.className}>Hola mundo</h1>
    </main>
  )
}
