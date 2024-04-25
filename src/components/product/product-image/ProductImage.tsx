import Image from 'next/image'

interface Props {
  src?: string
  alt: string
  // De esta forma heredamos e tipo de clases de tailwind para que el string que clases de llegue a este componente tenga que tener clases heredadas de tailwind
  className?: React.StyleHTMLAttributes<HTMLImageElement>['className']
  width: number
  height: number
}

export const ProductImage = ({ src, alt, className, width, height }: Props) => {
  const localSrc = src
    ? src.startsWith('http')
      ? src
      : `/products/${src}`
    : '/imgs/placeholder.jpg'

  return (
    <Image
      src={localSrc}
      width={width}
      height={height}
      alt={alt}
      className={className}
      priority
    />
  )
}
