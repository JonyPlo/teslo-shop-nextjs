import type { Gender } from '@/interfaces'

// Record es un tipo nativo de typescript, y en este caso usamos Record<ValidCategories, string> que es lo mismo que {[key: string]: string}, se suele usar el Record porque es mas fácil de leer
export const LABELS: Record<Gender, string> = {
  men: 'Men',
  women: 'Women',
  kid: 'Kids',
  unisex: 'everyone',
}
